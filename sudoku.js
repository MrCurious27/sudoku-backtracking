"use strict";

// Initial variables
var stack = [];

var sudokuList = [];
var i = 0;
var j = 0;
var number = 1;
var speed = 500;

// var speedDict = {
//     1: 1000,
//     2: 900,
//     3: 800,
//     4: 700,
//     5: 600,
//     6: 500,
//     7: 300,
//     8: 100,
//     9: 50,
//     10: 0.01,
// };

console.log("okok");

function getSudokuList() {
    sudokuList = [];
    console.log(speed);

    for (var m = 0; m < 9; m++) {
        var tempArray = [];
        for (var n = 0; n < 9; n++) {
            var tempSet = '#' + m + n;
            // console.log(tempSet);
            var temp = $(tempSet).val();
            // console.log(temp);
            // console.log(temp);
            if (temp == "-" || isNaN(temp) || temp == "") {
                temp = 0;
            } else {
                temp = parseInt(temp);
                $('#' + m + n).addClass('selectedColor');
            }
            tempArray.push(temp);
        }
        sudokuList.push(tempArray);
    }
    // for (var m = 0; m < sudokuList.length; m++) {
    //     console.log(sudokuList[m]);
    // }
}
// getSudokuList();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function logic() {
    getSudokuList();

    while (i < 9) {
        if (j < 9) {
            if (checkZero(i, j)) {
                if (number < 10) {
                    var mtemp = '#' + i + j;
                    await sleep(speed);
                    var rowCheck = await checkRow(number, i);
                    var columnCheck = await checkColumn(number, j);
                    var boxCheck = await checkBox(number, i, j);
                    $(mtemp).val(number);

                    // if (await checkRow(number, i) && await checkColumn(number, j) && await checkBox(number, i, j)) {
                    if (rowCheck[0] && columnCheck[0] && boxCheck[0]) {
                        var tempList = [];
                        tempList.push(i);
                        tempList.push(j);
                        tempList.push(number);
                        stack.push(tempList);
                        sudokuList[i][j] = number;

                        $(mtemp).val(number);
                        j++;
                        number = 1;
                        await sleep(speed);
                    } else {
                        if (!rowCheck[0]) {
                            $(mtemp).addClass('default3');
                            $('#' + i + rowCheck[1]).addClass('default3');
                        }

                        if (!columnCheck[0]) {
                            $(mtemp).addClass('default3');
                            $('#' + columnCheck[1] + j).addClass('default3');
                        }

                        if (!boxCheck[0]) {
                            $(mtemp).addClass('default3');
                            $('#' + boxCheck[1] + boxCheck[2]).addClass('default3');
                        }

                        await sleep(speed / 2);

                        if (!rowCheck[0]) {
                            $(mtemp).removeClass('default3');
                            $('#' + i + rowCheck[1]).removeClass('default3');
                        }

                        if (!columnCheck[0]) {
                            $(mtemp).removeClass('default3');
                            $('#' + columnCheck[1] + j).removeClass('default3');
                        }

                        if (!boxCheck[0]) {
                            $(mtemp).removeClass('default3');
                            $('#' + boxCheck[1] + boxCheck[2]).removeClass('default3');
                        }

                        number++;
                    }
                } else {
                    $('#' + i + j).val('');
                    if (backtracking()) {
                        break;
                    }
                    // backtracking();
                }
            } else {
                j++;
            }
        } else {
            j = 0;
            i++;
        }
    }
    console.log("Finished");

}

function backtracking() {
    if (stack.length == 0) {
        console.log("No Solution");
        $('#noSolution').show();
        return true;
    } else {
        var tempStackVar = stack.pop();
        i = tempStackVar[0];
        j = tempStackVar[1];
        number = tempStackVar[2] + 1;
        sudokuList[i][j] = 0;
        // var mtemp = '#' + i + j;
        // $(mtemp).val("-");

        // console.log("backtracked");
    }
}

function checkZero(x, y) {
    if (sudokuList[x][y] == 0) {
        // console.log("position ", x, y, " is 0");
        return true;
    }
    return false;
}

function checkRow(number, x) {
    for (var i = 0; i < sudokuList[x].length; i++) {
        if (number == sudokuList[x][i]) {
            return [false, i];
        }
    }
    return [true];
}

function checkColumn(number, y) {
    for (var m = 0; m < sudokuList.length; m++) {
        if (number == sudokuList[m][y]) {
            return [false, m];
        }
    }
    return [true];
}

function checkBox(number, x, y) {
    x = Math.floor(x / 3);
    y = Math.floor(y / 3);
    for (var m = x * 3; m < x * 3 + 3; m++) {
        for (var n = y * 3; n < y * 3 + 3; n++) {
            if (sudokuList[m][n] == number) {
                return [false, m, n];
            }
        }
    }
    return [true];
}

function resetVariable() {
    stack = [];

    sudokuList = [];
    i = 0;
    j = 0;
    number = 1;
}

resetVariable();

function resetInput() {
    for (var m = 0; m < 9; m++) {
        for (var n = 0; n < 9; n++) {
            var temp = '#' + m + n;
            $(temp).val("");
            $(temp).removeClass("selectedColor");
        }
    }
    $('#noSolution').hide();
}

function resetColor() {
    for (var m = 0; m < 9; m++) {
        for (var n = 0; n < 9; n++) {
            var temp = '#' + m + n;
            $(temp).removeClass("default3");
        }
    }
}

function resetAll() {
    resetInput();
    resetVariable();
    resetColor();
}


$(".sudokuinput").keyup(function() {
    getSudokuList();
    resetColor();
    var boxNumber = 0;
    for (var m = 0; m < 9; m++) {
        for (var n = 0; n < 9; n++) {
            boxNumber = $('#' + m + n).val();
            if (boxNumber != '0' && boxNumber != '') {

                sudokuList[m][n] = 0;

                var rowCheck = checkRow(boxNumber, m);
                var columnCheck = checkColumn(boxNumber, n);
                var boxCheck = checkBox(boxNumber, m, n);
                console.log(rowCheck);
                console.log(columnCheck);
                console.log(boxCheck);
                console.log(boxNumber);
                if (!rowCheck[0]) {
                    $('#' + m + n).addClass('default3');
                    $('#' + m + rowCheck[1]).addClass('default3');
                }

                if (!columnCheck[0]) {
                    $('#' + m + n).addClass('default3');
                    $('#' + columnCheck[1] + n).addClass('default3');
                }

                if (!boxCheck[0]) {
                    $('#' + m + n).addClass('default3');
                    $('#' + boxCheck[1] + boxCheck[2]).addClass('default3');
                }
                sudokuList[m][n] = boxNumber;
            }
        }
    }
});

$("#start").click(function() {
    console.log("clicked on start");
    resetVariable();
    logic();
});

$("#reset").click(function() {
    resetAll();
});

$("#speed").change(function() {

    var x = $("#speed").val();
    var t = x;
    var b = 0;
    var c = 100;
    var d = 7500;

    speed = 1025 - ((-c * ((t = t / d - 1) * t * t * t - 1) + b) * 100);
    console.log(speed);
});


// Array.prototype.shuffle = function() {
//     var arr = this.valueOf();
//     var ret = [];
//     while (ret.length < arr.length) {
//         var x = arr[Math.floor(Number(Math.random() * arr.length))];
//         if (!(ret.indexOf(x) >= 0)) ret.push(x);
//     }
//     return ret;
// }
//
// function getSudoku() {
//     console.log("Getting");
//     var sudoku = [];
//     var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//     sudoku.push(arr);
//     for (var i = 1; i < 9; i++) {
//
//         while (sudoku.length <= i) {
//             var newarr = arr.shuffle();
//             var b = false;
//             for (var j = 0; j < arr.length; j++) {
//                 for (var k = 0; k < i; k++) {
//                     if (sudoku[k].indexOf(newarr[j]) == j) b = true;
//                 }
//
//             }
//             if (!b) {
//                 sudoku.push(newarr);
//                 document.body.innerHTML += `${newarr}<br/>`;
//             }
//         }
//     }
//     return sudoku;
// }
//
// getSudoku();
