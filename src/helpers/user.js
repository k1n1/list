const genderSort = {
  F: "Female",
  M: "Male",
};

const changeGender = (list) => {
  list.forEach((e) => {
    e.gender = genderSort[e.gender] ? genderSort[e.gender] : "Other";
  });
  return list;
};

const getAgeGroup = (list) => {
  list.forEach((e) => {
    e.ageGroup =
      e.age > 18 && e.age < 45
        ? "adult"
        : e.age > 45 && e.age < 61
        ? "middle-aged"
        : "senior citizen";
    delete e.age;
  });
  return list;
};

module.exports = { changeGender, getAgeGroup };
