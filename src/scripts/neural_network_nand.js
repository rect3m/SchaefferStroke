class NeuronNAND {
  constructor(inputSize) {
    this.weights = new Array(inputSize);
    this.bias = Math.random() * 2 - 1; // Random initial weights and bias
    for (let i = 0; i < inputSize; i++) {
      this.weights[i] = Math.random() * 2 - 1;
    }
  }

  feedForward(inputs) {
    let sum = this.bias;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return this.activate(sum);
  }

  activate(x) {
    return 1 / (1 + Math.exp(-x));
  }

  train(inputs, target) {
    const output = this.feedForward(inputs);
    const error = target - output;

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i];
    }
    this.bias += error;
  }
}

class NANDNetwork {
  constructor() {
    this.neuron1 = new NeuronNAND(2);
  }

  train(iterations, displayTrainingResults) {
    const trainingData = [
      { inputs: [0, 0], target: 1 },
      { inputs: [0, 1], target: 1 },
      { inputs: [1, 0], target: 1 },
      { inputs: [1, 1], target: 0 }
    ];

    for (let i = 0; i < iterations; i++) {
      const data = trainingData[Math.floor(Math.random() * trainingData.length)];
      const inputs = data.inputs;
      const target = data.target;

      const output = this.neuron1.feedForward(inputs);

      this.neuron1.train(inputs, target);

      if (displayTrainingResults) {
        displayTrainingResults(i + 1, inputs, target, output);
      }
    }
  }

  predict(inputs) {
    return this.neuron1.feedForward(inputs) > 0.5 ? 0 : 1;
  }
}

const networkNAND = new NANDNetwork();

const trainingResultsNAND = document.getElementById('trainingResults');
const predictionFormNAND = document.getElementById('predictionForm');
const predictionResultNAND = document.getElementById('predictionResult');

function displayTrainingResultsNAND(iteration, inputs, target, output) {
  const resultElement = document.createElement('div');
  resultElement.textContent = `Iteration: ${iteration}, Inputs: [${inputs}], Target: ${target}, Output: ${output}`;
  trainingResultsNAND.appendChild(resultElement);
}

networkNAND.train(10000, displayTrainingResultsNAND);

predictionFormNAND.addEventListener('submit', function(event) {
  event.preventDefault();
  const input1 = parseFloat(document.getElementById('input1-nand').value);
  const input2 = parseFloat(document.getElementById('input2-nand').value);
  const prediction = networkNAND.predict([input1, input2]);
  predictionResultNAND.textContent = `Prediction: ${prediction}`;
});
