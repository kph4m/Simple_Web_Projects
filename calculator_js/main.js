//----- GET ELEMENTS -----//
const operationsElement = document.querySelector('.operations')
const mainResultElement = document.querySelector('.main-result')
const tempResultElement = document.querySelector('.temp-result')

// Get all numbers
const numbersElement = document.querySelectorAll('.number')

// Get all operations
const operatorElement = document.querySelectorAll('.operator')

// Get all operatorsv2
const operator2Element = document.querySelectorAll('.operator2')

// Equal
const equalElement = document.querySelector('.equal')

// Clear All
const clearAllElement = document.querySelector('.clear-all')

//Clear Last Entry
const clearLastEntryElement = document.querySelector('.clear-last-entry')

//----- SET UP VARIABLES -----//

// Keeps track of operations display
let operationsNum = ''

// Keeps track of main display
let mainResultNum = ''

// Keeps track of mathematical results
let result = null

// Keeps track of operations
let lastOperation = ''

// Keeps track of whether decimal is used
let haveDot = false

// Gets the name of the operation
let operationName = ''

// Keeps track of which operations we're doing
let operationsVersion

//----- NUMBERS AND DOT HANDLER -----//
numbersElement.forEach(number => {
  number.addEventListener('click', e => {
    // Dot Handler //
    //If dot hasn't been pressed yet, set haveDot to true
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true
    }
    //If dot has been pressed already, return nothing
    else if (e.target.innerText === '.' && haveDot) {
      return
    }
    //Pi
    if (e.target.innerText === 'π') {
      mainResultNum += `${Math.PI}`
      mainResultElement.innerText = mainResultNum
    } else {
      //Add Number to main result (append, not add mathmatically)
      mainResultNum += e.target.innerText
      //Display Number
      mainResultElement.innerText = mainResultNum
    }
  })
})

//----- OPERATIONS HANDLER -----//
operatorElement.forEach(operation => {
  operation.addEventListener('click', e => {
    operationsVersion = 1
    // If number hasn't been inputted, can't perform operations
    if (!mainResultNum) {
      return
    }
    haveDot = false
    //Get operation name
    operationName = e.target.innerText
    // If all 3 components are present, free to perform math operation
    if (operationsNum && mainResultNum && lastOperation) {
      mathOperation()
    } else {
      result = parseFloat(mainResultNum)
    }
    addToOperations(operationsVersion, operationName)
    lastOperation = operationName
  })
})

//----- MATHEMATICAL OPERATIONS HANDLER -----//
function mathOperation () {
  if (lastOperation === 'X') {
    result = parseFloat(result) * parseFloat(mainResultNum)
  } else if (lastOperation === '%') {
    result = parseFloat(result) % parseFloat(mainResultNum)
  } else if (lastOperation === '/') {
    result = parseFloat(result) / parseFloat(mainResultNum)
  } else if (lastOperation === '-') {
    result = parseFloat(result) - parseFloat(mainResultNum)
  } else if (lastOperation === '+') {
    result = parseFloat(result) + parseFloat(mainResultNum)
  }
}

//----- OPERATIONS HANDLER 2 -----//
operator2Element.forEach(operation => {
  operation.addEventListener('click', e => {
    operationsVersion = 2
    operationName = e.target.innerText
    haveDot = false
    // If mainResultNum doesn't exist, return
    if (!mainResultNum) {
      return
    }
    // If mainResultNum does exist
    else {
      mathOperation2()
      mainResultElement.innerText = result
    }
    addToOperations(operationsVersion, operationName)
  })
})

//----- MATHEMATICAL OPERATIONS HANDLER 2 -----//
function mathOperation2 () {
  if (operationName === '√x') {
    result = Math.sqrt(parseFloat(mainResultNum))
    console.log(result)
  } else if (operationName === 'x²') {
    result = parseFloat(mainResultNum) * parseFloat(mainResultNum)
  } else if (operationName === 'cos') {
    result = Math.cos(parseFloat(mainResultNum))
  } else if (operationName === 'sin') {
    result = Math.sin(parseFloat(mainResultNum))
  } else if (operationName === 'tan') {
    result = Math.tan(parseFloat(mainResultNum))
  }
}

//----- ADD TO OPERATIONS -----//
function addToOperations (num, name) {
  // Operations Handler 1
  if (num === 1) {
    operationsNum += mainResultNum + ' ' + name + ' '
    operationsElement.innerText = operationsNum
    mainResultElement.innerText = ' '
    mainResultNum = ''
    tempResultElement.innerText = result
  }
  // Operations Handler 2
  if (num === 2) {
    operationsNum += '‎'
    operationsElement.innerText = operationsNum
    mainResultNum = result
    tempResultElement.innerText = '0'
  }
}

//----- EQUAL BUTTON HANDLER -----//
equalElement.addEventListener('click', e => {
  if (!operationsNum || !mainResultNum) {
    return
  }
  haveDot = false
  operationsNum += mainResultNum + ' '
  operationsElement.innerText = operationsNum
  mathOperation()
  mainResultElement.innerText = result
  tempResultElement.innerText = ''
  mainResultNum = result
  operationsNum = ''
})

//----- CLEAR ALL -----//
clearAllElement.addEventListener('click', e => {
  haveDot = false
  operationsNum = ' '
  operationsElement.innerText = '0'

  mainResultNum = ''
  mainResultElement.innerText = 'Enter Number'

  result = ''

  lastOperation = ''
  tempResultElement.innerText = '0'
})

//----- CLEAR LAST ENTRY -----//
clearLastEntryElement.addEventListener('click', e => {
  mainResultNum = ''
  mainResultElement.innerText = 'Enter Number'
})

//----- KEYBOARD COMPATABILITY -----//
window.addEventListener('keydown', e => {
  // Num elements
  if (
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.'
  ) {
    clickNumElement(e.key)
    // Operator Elements
  } else if (e.key === '+' || e.key === '-' || e.key === '%' || e.key === '/') {
    clickOperator(e.key)
    // Multiplication
  } else if (e.key === '*') {
    clickOperator('X')
    // Enter
  } else if (e.key === 'Enter' || e.key === '=') {
    clickEqual()
  }
})

// Click Elements //
function clickNumElement (key) {
  numbersElement.forEach(button => {
    if (button.innerText === key) {
      button.click()
    }
  })
}

// Click Operators
function clickOperator (key) {
  operatorElement.forEach(button => {
    if (button.innerText === key) {
      button.click()
    }
  })
}

// Click Equal
function clickEqual () {
  equalElement.click()
}
