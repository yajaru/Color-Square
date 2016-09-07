#include <iostream>
#include <map>

int cantorPairing(int, int);
void generatePairs();
bool isGoodBoard();
void doBoard(int);

const int size = 4;
const int maxToCheckTo = 5;
int minFound = 99;
int board[size * size];
std::map<int, bool> pairs;

int main() {
  for(int i = 0; i < size * size; ++i) {
    board[i] = -1;
  }
  doBoard(0);
  std::cout << minFound;
}

void doBoard(int index) {
  // we've reached the end so we check the board;
  if (index >= size * size) {
    int max=0;
    for(int i = 0; i < size*size; ++i) {
      if(board[i] > max)
        max = board[i];
    }
    if( max < minFound ) {
      std::cout << "Found new min: " << max << std::endl;
      for( auto &i : board) {
        std::cout << i << ' ';
      }
      std::cout << std::endl;
      minFound = max;
    }
    return;
  }

  for(int i = 0; i <= maxToCheckTo; ++i) {
    ++board[index];
    generatePairs();
    if(isGoodBoard()) {
      doBoard(index + 1);
    }
  }
  board[index] = -1;
  return;
}


bool isGoodBoard() {
  for(auto &iterator : pairs) {
    if(iterator.second == true) {
      return false;
    }
  }
  return true;
}

void generatePairs() {
  pairs.clear();
  for(int i = 0; i < size * size; ++i) {
    if(board[i] == -1)
      break;

    if(i % size < size - 1 && board[i + 1] != -1) {
      std::map<int, bool>::iterator it = pairs.find(cantorPairing(board[i], board[i+1]));
      if(it == pairs.end()) {
        pairs[cantorPairing(board[i], board[i+1])] = false;
      }
      else {
        pairs[cantorPairing(board[i], board[i+1])] = true;
      }
    }

    if(i / size < size - 1 && board[i + size] != -1) {
      std::map<int, bool>::iterator it = pairs.find(cantorPairing(board[i], board[i+size]));
      if(it == pairs.end()) {
        pairs[cantorPairing(board[i], board[i+size])] = false;
      }
      else {
        pairs[cantorPairing(board[i], board[i+size])] = true;
      }
    }
  }
}

int cantorPairing(int a, int b) {
  int x = std::max(a,b);
  int y = std::min(a,b);
  return (int)((x + y) * (float)(x + y + 1)/2 + y);
}
