let balanced = {};

balanced.run = async function balancedCheck(str){
    let obj = {
        '{' : '}',
        '[' : ']',
        '(' : ')'
    };
    let revObj = {
        '}' : '{',
        ']' : '[',
        ')' : '('
    };
    let i = 0;

    while(i<str.length){
        let len = str.length;
        let start = str[i];
        let end = str[len - 1];
        if(obj[start] !== end){
            if(obj[start] !== undefined) return `unbalanced ${obj[start]} is missing`;
            else return `unbalanced ${revObj[start]} is missing`;
        }
        str = str.slice(1,-1)
    }
    return 'balanced';
}

module.exports = balanced;