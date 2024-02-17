//
// Move to DB
//
const MaleMetaData = {
  strength: {
    benchPress: 98,
    deadlift: 150,
    squat: 130,
    pullups: 18,
    dips: 20,
  },
  endurance: {
    squat: 57,
    pushups: 51,
    situps: 60,
    plank: 172,
    pools: 15,
    bike5KM: 630,
  },
  stamina: {
    run3KM: 900,
    run5KM: 1380,
    run10KM: 3060,
    sprint400M: 89,
  },
};

const ProMaleMetaData = {
  strength: {
    benchPress: 169,
    deadlift: 220,
    squat: 185,
    pullups: 37,
    dips: 49,
  },
  endurance: {
    squat: 150,
    pushups: 99,
    situps: 159,
    plank: 300,
    pools: 10,
    bike5KM: 510,
  },
  stamina: {
    run3KM: 660,
    run5KM: 1080,
    run10KM: 2520,
    sprint400M: 70,
  },
};

const FemaleMetaData = {
  strength: {
    benchPress: 51,
    deadlift: 87,
    squat: 73,
    pullups: 6,
    dips: 10,
  },
  endurance: {
    squat: 39,
    pushups: 19,
    situps: 44,
    plank: 155,
    pools: 45,
    bike5KM: 780,
  },
  stamina: {
    run3KM: 1050,
    run5KM: 1560,
    run10KM: 3360,
    sprint400M: 103,
  },
};

const ProFemaleMetaData = {
  strength: {
    benchPress: 98,
    deadlift: 147,
    squat: 136,
    pullups: 22,
    dips: 35,
  },
  endurance: {
    squat: 131,
    pushups: 56,
    situps: 128,
    plank: 240,
    pools: 45,
    bike5KM: 570,
  },
  stamina: {
    run3KM: 780,
    run5KM: 1260,
    run10KM: 2700,
    sprint400M: 82,
  },
};

module.exports = { MaleMetaData, FemaleMetaData, ProMaleMetaData, ProFemaleMetaData };
