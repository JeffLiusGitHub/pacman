export const details = [
  'The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. There are no other obstructions on the table surface.',
  'The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.',
  'MOVE will move the toy robot one unit forward in the direction it is currently facing.',
  'LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.',
  'REPORT will announce the X,Y and orientation of the robot. A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.',
  'EG: PLACE 0,0,NORTH MOVE REPORT Output: 0,1,NORTH',
];
