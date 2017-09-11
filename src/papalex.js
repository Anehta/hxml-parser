const lextype = {
  WORD: 1,
  LAB: 2,
  RAB: 3,
  NUMBER: 4,
  COMMA: 5,
  SQUOTES: 6,  // single quotes around
  QUOTES: 7,   // quotes
  OBJECT: 8,
  SCENE: 9,
  LAYER: 10,
  EUQAL: 11,
  SRC: 12,
  SPRIT: 13,
  MINUS: 14,
  UI2: 15,
  UI3: 16,
  SCRIPT: 17,
  DYNAMIC: 18,
};

function isString(str) {
  return (typeof str == 'string') && str.constructor == String;
}

function isWord(str) {
  if ((str >= 65 && str <= 90) || (str >= 97 && str <= 122) || (str > 255)) {
    return true;
  }
  return false;
}

function isNumber(str) {
  if (str >= 48 && str <= 57) {
    return true;
  }
  return false;
}

class Lex {
  constructor() {
    this.lextype = lextype;
  }

  Analysis(data) {
    if (!isString(data)) {
      throw new Error(`PapaLex-Error: data is ${typeof (data)} type that requires string type`, 10);
    }
    data = data.replace(/<!--[\s\S]*-->/, '');

    var index = 0;
    var length = data.length;
    var line = 1;
    var token = [];
    var tmp = '';
    while (1) {
      if (index >= length) {
        if (data[index] != null) {
          tmp += data[index];
          token.push({ data: tmp, line });
          tmp = '';
        }
        break;
      }

      while (data[index] == ' ' || data[index] == '') {
        index++;
      }

      if (data[index] == '-') {
        token.push({ data: '-', line });
        index++;
        continue;
      }

      if (data[index] == '%') {
        token.push({ data: '%', line });
        index++;
        continue;
      }

      if (data[index] == '<') {
        token.push({ data: '<', line });
        index++;
        continue;
      }

      if (data[index] == '>') {
        token.push({ data: '>', line });
        index++;
        continue;
      }

      if (data[index] == '=') {
        token.push({ data: '=', line });
        index++;
        continue;
      }

      if (data[index] == ',') {
        token.push({ data: ',', line });
        index++;
        continue;
      }

      if (data[index] == '\n' || data[index] == '\r') {
        index++;
        line++;
        continue;
      }

      if (isWord(data.charCodeAt(index))) {
        while (index < length) {
          if (isWord(data.charCodeAt(index)) || data[index] == '.' ||
              data[index] == '_' || isNumber(data.charCodeAt(index))) {
            tmp += data[index++];
          } else {
            token.push({ data: tmp, line });
            tmp = '';
            break;
          }
        }
        continue;
      } else if (isNumber(data.charCodeAt(index)) || data[index] == '.') {
        var dotcount = 0;
        while (index < length) {
          if (isNumber(data.charCodeAt(index))) {
            tmp += data[index++];
          } else {
            if (dotcount > 1) {
              console.log('Warring papalex line:', line, 'extra comma,Auto ignore!');
              index++;
              continue;
            }
            if (data[index] == '.') {
              dotcount++;
              tmp += data[index++];
            } else {
              token.push({ data: tmp, line });
              tmp = '';
              break;
            }
          }
        }

        continue;
      } else if (data[index] == '"') {
        let dqcount = 0;
        while (1) {
          if (index >= length) {
            throw new Error(`PapaLex-Error(line:${line}): No matching double "'" are found`);
          }
          if (data[index] == '\\') { // handle '\' comma
            index++;
            tmp += data[index++];
            continue;
          }
          if (dqcount == 2) {
            token.push({ data: tmp, line });
            token.push({ data: '"', line });
            tmp = '';
            break;
          }
          if (data[index] == '"') {
            dqcount++;
            if (dqcount < 2) {
              token.push({ data: '"', line });
            }
            index++;
            continue;
          }
          tmp += data[index++];
        }
      } else if (data[index] == "'") {
        var dqcount = 0;

        while (1) {
          if (index >= length) {
            throw new Error(`PapaLex-Error(line:${line}): No matching double "'" are found`);
          }

          if (data[index] == '\\') { // handle '\' comma
            index++;
            tmp += data[index++];
            continue;
          }

          if (dqcount == 2) {
            token.push({ data: tmp, line });
            token.push({ data: '\'', line });
            tmp = '';
            break;
          }

          if (data[index] == "'") {
            dqcount++;
            if (dqcount < 2) {
              token.push({ data: '\'', line });
            }
            index++;
            continue;
          }

          tmp += data[index++];
        }
      } else if (data[index] == '/') {
        token.push({ data: '/', line });
        index++;
      } else {
        console.log('PapaLex-Warring (line:', line, '):bad comma', data[index], 'Auto ignore!');
        index++;
      }
    }
    token.forEach((value) => {
      var test = _.toNumber(value.data);
      if (isNaN(test)) {
        if (value.data == '<') {
          value.type = lextype.LAB;
        } else if (value.data == '>') {
          value.type = lextype.RAB;
        } else if (value.data == "'") {
          value.type = lextype.SQUOTES;
        } else if (value.data == '"') {
          value.type = lextype.QUOTES;
        } else if (value.data == 'object') {
          value.type = lextype.OBJECT;
        } else if (value.data == 'papascene') {
          value.type = lextype.SCENE;
        } else if (value.data == 'papalayer') {
          value.type = lextype.LAYER;
        } else if (value.data == 'papabody') {
          value.type = lextype.BODY;
        } else if (value.data == '=') {
          value.type = lextype.EUQAL;
        } else if (value.data == ',') {
          value.type = lextype.COMMA;
        } else if (value.data == '/') {
          value.type = lextype.SPRIT;
        } else if (value.data == '-') {
          value.type = lextype.MINUS;
        } else if (value.data == 'ui2d') {
          value.type = lextype.UI2;
        } else if (value.data == 'ui3d') {
          value.type = lextype.UI3;
        } else if (value.data == 'script') {
          value.type = lextype.SCRIPT;
        } else if (value.data == 'dynamic') {
          value.type = lextype.DYNAMIC;
        } else {
          value.type = lextype.WORD;
        }
      } else {
        value.type = lextype.NUMBER;
      }
      // console.log(value.data,"line:",value.line,value.type)
    });
    return token;
  }
}

export default Lex;