const prior = document.getElementById("prior");
const sensitivity = document.getElementById("sensitivity");
const falseAcceptance = document.getElementById("falsePositive");

function updateBayesCalculator() {
  // A: the attempt is made by the legitimate account owner.
  // B: the biometric system accepts the fingerprint match.
  const pOwner = Number(prior.value) / 100;
  const genuineAcceptance = Number(sensitivity.value) / 100;
  const falseAcceptanceRate = Number(falseAcceptance.value) / 100;
  const pOther = 1 - pOwner;

  const numerator = genuineAcceptance * pOwner;
  const denominator = numerator + falseAcceptanceRate * pOther;
  const posterior = denominator === 0 ? 0 : numerator / denominator;

  document.getElementById("priorOut").textContent =
    `${Number(prior.value).toFixed(1)}%`;

  document.getElementById("sensitivityOut").textContent =
    `${Number(sensitivity.value).toFixed(0)}%`;

  document.getElementById("falsePositiveOut").textContent =
    `${Number(falseAcceptance.value).toFixed(1)}%`;

  document.getElementById("posteriorResult").textContent =
    `${(posterior * 100).toFixed(1)}%`;

  document.getElementById("posteriorBar").style.width =
    `${posterior * 100}%`;

  document.getElementById("calcFormula").textContent =
    `P(Owner | Accepted) = (${genuineAcceptance.toFixed(3)} × ${pOwner.toFixed(3)}) / [(${genuineAcceptance.toFixed(3)} × ${pOwner.toFixed(3)}) + (${falseAcceptanceRate.toFixed(3)} × ${pOther.toFixed(3)})]`;

  document.getElementById("posteriorExplanation").textContent =
    `Given an accepted fingerprint match, the estimated probability that the attempt comes from the legitimate owner is ${(posterior * 100).toFixed(1)}%.`;
}

[prior, sensitivity, falseAcceptance].forEach((control) => {
  control.addEventListener("input", updateBayesCalculator);
});

updateBayesCalculator();
