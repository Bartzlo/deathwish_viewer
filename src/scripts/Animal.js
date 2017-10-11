class Animal {
  constructor(foots) {
    this.foots = foots;
    console.log('create new animal...');
  }

  cutFoot(){
    console.log('cutting foot');
    this.foots-=3;
  }

  getFootsCount(){
    console.log(this.foots);
  }
}

module.exports = Animal;
