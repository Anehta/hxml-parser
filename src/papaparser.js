import PapaLex from './papalex';

const lex = PapaLex.lex;

class PapaParser {
  Parser(data) {
    var tokenList = PapaLex().Analysis(data);
    tokenList.index = 0;
    tokenList.GetNext = () => tokenList[tokenList.index++];

    tokenList.GetLast = () => tokenList[--tokenList.index];

    tokenList.IsEnd = () => {
      if (tokenList.index >= tokenList.length) {
        return true;
      }
      return false;
    };

    tokenList.papaWord = [];
    tokenList.PushPapaWord = (obj) => {
      tokenList.papaWord.push(obj);
    };

    tokenList.PopPapaWord = () => tokenList.papaWord.pop();

    tokenList.F = () => {
      var next = tokenList.GetNext();
      if (next != null && next.type == lex.lextype.LAB) {
        var finalresult = { error: null, label: null, children: null, attribute: null, next: null };
        var papa = tokenList.PapaWord();
        if (papa.error == null) { // <papaword xxxx>
          var t = tokenList.T();
          if (t.error != null) {
            console.log(t.error);
            throw t.error;
          }
          tokenList.PushPapaWord(papa.data);
          finalresult.label = papa.data;
          finalresult.attribute = t;
          next = tokenList.GetNext();
          if (next.type != lex.lextype.RAB) {
            var err = new Error(`PapaParser-Error(line:${next.line}) : parser can't matched '>'`);
            console.log(err);
            throw err;
          }
          var child = tokenList.F();
          if (child.error == null) { // inside
            if (child.label != null) {
              finalresult.children = child;
            }
          } else {
            next = tokenList.GetLast();
            next = tokenList.GetLast();
          }
          var nextF = tokenList.F();
          if (nextF.error != null) {
            throw nextF.error;
          }
          if (nextF.label != null) {
            finalresult.next = nextF;
          }
          return finalresult;
        } else { // </papaword xxx>
          tokenList.GetLast();
          next = tokenList.GetNext();
          if (next.type == lex.lextype.SPRIT) {
            papa = tokenList.PapaWord();
            if (papa.error != null) { // apply empty
              console.log(papa.error);
              throw papa.error;
            }
            const papaTmp = tokenList.PopPapaWord();
            if (papaTmp != papa.data) {
              const err = new Error(`PapaParser-Error(line:${next.line}) : ` +
                  `can't matched </${papaTmp}>  current:<${papa.data}>`);
              console.log(err);
              throw err;
            }
            next = tokenList.GetNext();
            if (next.type != lex.lextype.RAB) {
              const err = new Error(`PapaParser-Error(line:${next.line}) : need matched '>'`);
              console.log(err);
              throw err;
            }
            return finalresult;
          } else {
            const err = new Error(`PapaParser-Error(line:${next.line}) : need matched </papaword>`);
            console.log(err);
            throw err;
          }
        }
      }
      tokenList.GetLast();
      return { error: null, label: null, children: [], attribute: [] };
    };

    tokenList.PapaWord = () => {
      var next = tokenList.GetNext();
      if (next.data == 'papascene' || next.data == 'papalayer' ||
          next.data == 'papabody' || next.data == 'object' ||
          next.data == 'ui2d' || next.data == 'ui3d' || next.data == 'script' || next.data == 'dynamic') {
        return { error: null, data: next.data, type: next.type };
      }
      return { error: new Error(`PapaParser-Error(line:${next.line}) : token error,parser need 'papascene' ` +
          `or 'papalayer' or 'papabody' or 'object' or 'ui2' or 'ui3' or 'script' now：${next.data}`),
        data: null,
        type: null };
    };

    tokenList.T = () => {
      var next = tokenList.GetNext();
      if (next.type == lex.lextype.WORD) {
        var resultmember = next.data;
        next = tokenList.GetNext();
        if (next.type == lex.lextype.EUQAL) {
          var result = tokenList.S();
          if (result.error == null) {
            var TResult = tokenList.T();
            var resulttype = null;
            let resultMarginType = null;
            if (result.type) {
              resulttype = result.type;
            }
            if (result.margin_type) {
              resultMarginType = result.margin_type;
            }

            var returnResult = { error: null, data: [{ member: resultmember, data: result.data }] };
            if (resulttype) {
              returnResult.data[0].type = resulttype;
            }
            if (resultMarginType) {
              returnResult.data[0].margin_type = resultMarginType;
            }


            if (TResult.error == null) {
              // console.log("test",TResult.data)
              if (TResult.data.length > 0) {
                returnResult.data = returnResult.data.concat(TResult.data);
              }
              return returnResult;
            }
            return { error: returnResult.error };
            // successful
          } else {
            return { error: new Error(`PapaParser-Error(line:${next.line}) ` +
                ': token error,parser need NUMBER or STRING') };
            // error Need NUMBER|STRING
          }
        } else {
          return { error: new Error(`PapaParser-Error(line:${next.line}) : token error,parser need '='`) };
          // error need '='
        }
      }
      tokenList.GetLast();
      return { error: null, data: [] };
      // apply empty
    };

    tokenList.S = () => {
      var result = tokenList.NUMBER();
      if (result.error == null) {
        // successful
        return result;
      } else {
        result = tokenList.STRING();
        if (result != null) {
          if (result.error == null) {
            // successful
            return result;
          } else {
            // error Need NUMBER|STRING
            return { error: result.error };
          }
        } else {
          var next = tokenList.GetNext();
          tokenList.GetLast();
          var error = new Error(`PapaParser-Error(line:${next.line}) :token error,parser need match string`);
          throw error;
          return { error: new Error(`PapaParser-Error(line:${next.line}) :token error,parser need match string`) };
        }
      }
    };

    tokenList.NUMBER = () => {
      var next = tokenList.GetNext();
      var isMinus = false;
      if (next.type == lex.lextype.MINUS) {
        isMinus = true;
        next = tokenList.GetNext();
      }

      if (next.type == lex.lextype.NUMBER) {
        var word = next.data;
        next = tokenList.GetNext();
        if (next.data == 'px') {
          // successful
          return { error: null,
            data: { data: (isMinus ? -parseFloat(word) : parseFloat(word)), type: 'NUMBER', margin_type: 'px' } };
        } else if (next.data == '%') {
          return { error: null,
            data: { data: (isMinus ? -parseFloat(word) : parseFloat(word)), type: 'NUMBER', margin_type: '%' } };
        } else if (next.data == 'left') {
          return { error: null,
            data: { data: (isMinus ? -parseFloat(word) : parseFloat(word)), type: 'NUMBER', margin_type: 'left' } };
        } else if (next.data == 'right') {
          return { error: null,
            data: { data: (isMinus ? -parseFloat(word) : parseFloat(word)), type: 'NUMBER', margin_type: 'right' } };
        } else if (next.data == 'top') {
          return { error: null,
            data: { data: (isMinus ? -parseFloat(word) : parseFloat(word)), type: 'NUMBER', margin_type: 'top' } };
        } else if (next.data == 'bottom') {
          return { error: null,
            data: { data: (isMinus ? -parseFloat(word) : parseFloat(word)), type: 'NUMBER', margin_type: 'bottom' } };
        } else {
          tokenList.GetLast();
          return { error: null,
            data: { data: (isMinus ? -parseFloat(word) : parseFloat(word)), type: 'NUMBER', margin_type: 'px' } };
          // successful
        }
      } else {
        tokenList.GetLast();
        // error Need NUMBER
        return { error: new Error(`PapaParser-Error(line:${next.line}) : token error,parser need NUMBER!`) };
      }
    };

    tokenList.STRING = () => {
      var next = tokenList.GetNext();
      if (next.type == lex.lextype.QUOTES) {
        next = tokenList.GetNext();
        if (next.type == lex.lextype.WORD) {
          const word = next.data;
          next = tokenList.GetNext();
          if (next.type == lex.lextype.QUOTES) {
            // successful
            return { error: null, data: word, type: 'STRING' };
          } else {
            // error can't find matched '"'
            return { error: new Error(`PapaParser-Error(line:${next.line})` +
                ' : token error,parser can\'t find matched \'"\'') };
          }
        } else {
          next = tokenList.GetNext();
          if (next.type == lex.lextype.QUOTES) {
            // successful
            return { error: null, data: '', type: 'STRING' };
          } else {
            // error need WORD or '"'
            return { error: new Error(`PapaParser-Error(line:${next.line}) : token error,parser need WORD or '"'`) };
          }
        }
      } else if (next.type == lex.lextype.SQUOTES) {
        next = tokenList.GetNext();
        if (next.type == lex.lextype.WORD) {
          var word = next.data;
          next = tokenList.GetNext();
          if (next.type == lex.lextype.SQUOTES) {
            // successful
            return { error: null, data: word, type: 'STRING' };
          } else {
            // error can't find matched '"'
            return { error: new Error(`PapaParser-Error(line:${next.line}) : token error,parser can't find matched`) };
          }
        } else if (next.type == lex.lextype.SQUOTES) {
          // successful
          return { error: null, data: '', type: 'STRING' };
        } else {
          // error need WORD or '''
          return { error: new Error(`PapaParser-Error(line:${next.line}) : token error ,parser need WORD or "'"`) };
        }
      }
    };
    return tokenList.F();
  }
}

export default PapaParser;