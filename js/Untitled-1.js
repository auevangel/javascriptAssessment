let pieceId="piece02";

let pieceIdArray = ['piece01', 'piece02', 'piece03'];
    let remainingPieces = pieceIdArray.filter(otherPieces);
    function otherPieces(idString) {
        return idString !== pieceId;
    };
console.log(remainingPieces);