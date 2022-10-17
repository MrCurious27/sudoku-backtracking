# sudoku solver usingbacktracking

Sudoku solver visualizer using Backtracking Algo.

In simple terms it will solve a puzzle by inserting the digit "1" in the first cell and checking to see if it is permitted to be there. 
If there are no violations (checking row, column, and box restrictions), the algorithm moves to the next cell and inserts a "1" in that cell. 
When checking for violations, if it is detected that the "1" is not permitted, the value is advanced to "2." 
If the algorithm discovers a cell where none of the nine digits are permitted, 
it leaves that cell blank and returns to the previous cell. 
The value in that cell is then increased by one. This is continued until the all 81 cell are filled.

The speed may be modified, and the visuls can be seen quicker or slower.

Program won't say if the given sudoku has unique solutions or not.

It will always give solution if atleast 1 solution is possible.
