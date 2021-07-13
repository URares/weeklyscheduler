const MAX_DAYS = 5;
class ActivityList {
  data = [
    {
      morning: {
        start: '09:00',
        end: '11:00',
        type: 'Alergare Usoara'

      },
      evening: {
        start: '19:00',
        end: '21:00',
        type: 'Inot'

      }
    },
    {
      morning: {
        start: '09:00',
        end: '10:00',
        type: 'Maraton'

      },
      evening: {
        start: '17:00',
        end: '19:00',
        type: 'Dans'

      }
    },
    {
      morning: {
        start: '09:00',
        end: '10:00',
        type: 'Inot'

      },
      evening: {
        start: '17:00',
        end: '19:00',
        type: 'Maraton'

      }
    },
    {
      morning: {
        start: '09:00',
        end: '10:00',
        type: 'Inot'

      },
      evening: {
        start: '17:00',
        end: '19:00',
        type: 'Karate'

      }
    },
    {
      morning: {
        start: '09:00',
        end: '10:00',
        type: 'Inot'

      },
      evening: {
        start: '17:00',
        end: '19:00',
        type: 'Ciclism'

      }
    }

  ]

  getActivities(day) {
    return this.data[day];
  }

  setActivity(idx, data) {
    this.data[idx] = data;

  }
}


class Utils {
  static getDayName(dayIdx) {
    return ["Luni", "Marti", "Miercuri", "Joi", "Vineri"][dayIdx];
  }
}

class SummaryActivityView {
  constructor() {
      this.el = document.getElementById('summary');
      this.isRendered = false;
  }

  render() {


    const template = document.getElementById('summaryTpl');
    const tplClone = template.content.firstElementChild.cloneNode(true);
    this.el.appendChild(tplClone);
    this.el.style.display = 'none';

    this.update();
    this.isRendered = true;
  }

  getActivityHTML(data) {
    return `<li>${data.start}-${data.end} ${data.type}</li>`;
  }

  isVisible() {
    return this.el.style.display != 'none';
  }

  toggleDisplay(show) {
    if (show) {
      this.el.style.display = 'block';
      this.update();
    } else {
      this.el.style.display = 'none';
    }
  }

  update() {

    this.el.querySelector('#activityList').innerHTML = '';

    controller.activityList.data.forEach((activity, idx) => {
      const name = Utils.getDayName(idx);
      this.el.querySelector('#activityList').innerHTML += `<p>${name}</p><ul>`;
      this.el.querySelector('#activityList').innerHTML += this.getActivityHTML(activity.morning)
      this.el.querySelector('#activityList').innerHTML += this.getActivityHTML(activity.evening);
      this.el.querySelector('#activityList').innerHTML += '<ul/>';

    })

  }

}


class DayView {

  constructor(props) {
    this.el = document.getElementById('container');
    this.props = props;
    this.isRendered = false;
  }

  render() {
    const template = document.getElementById("dayTpl");
    const tplClone = template.content.firstElementChild.cloneNode(true);
    this.el.appendChild(tplClone);

    this.morningActivity = new ActivityView('morning', this.props.morning);
    this.morningActivity.render();

    this.eveningActivity = new ActivityView('evening', this.props.evening);
    this.eveningActivity.render();

    this.update(this.props)

    this.el.querySelector('#nextBtn').addEventListener('click', this.onNext);
    this.el.querySelector('#prevBtn').addEventListener('click', this.onPrev);
    this.el.querySelector('#summaryBtn').addEventListener('click', this.onSummary.bind(this));


    this.isRendered = true;
  }

  update(props) {

    this.el.querySelector('#dayName').innerHTML = Utils.getDayName(StateManager.getCurrentDay());
    this.morningActivity.update(props.morning);
    this.eveningActivity.update(props.evening);
  }

  onNext() {
    StateManager.goToNextDay();
    controller.updateDay();

  }

  onPrev() {
    StateManager.gotoPrevDay();
    controller.updateDay();
  }

  onSummary() {
    StateManager.saveDay(this.getData());
    controller.toggleSummary();
  }

  getData() {

    return {
      morning: this.morningActivity.getData(),
      evening: this.eveningActivity.getData()
    }

  }


}


class ActivityView {
  constructor(id, props) {
    this.el = document.getElementById(id);
    this.props = props;
    this.id = id;
  }
  render() {
    const template = document.getElementById("activityTpl");
    const tplClone = template.content.firstElementChild.cloneNode(true);
    this.el.appendChild(tplClone);
    this.el.querySelector('#activityName').innerHTML = this.getActivityName(this.id);
    this.update(this.props);
  }
  update(props) {
    this.el.querySelector('#start').value = props.start;
    this.el.querySelector('#end').value = props.end;
    this.el.querySelector('#type').value = props.type;
  }
  getActivityName(type) {
    return {
      morning: 'Dimineata',
      evening: 'Seara'
    }[type];
  }
  getData() {
    return {
      start: this.el.querySelector('#start').value,
      end: this.el.querySelector('#end').value,
      type: this.el.querySelector('#type').value
    }
  }
}

class StateManager {
  static _currentDay = 0;

  static goToNextDay() {
    if (StateManager._currentDay < MAX_DAYS - 1) {
      StateManager._currentDay ++
    }
  }

  static  gotoPrevDay() {

    if (StateManager._currentDay > 0) {
      StateManager._currentDay --;

    }

  }

  static getCurrentDay() {
    return StateManager._currentDay;
  }

  static saveDay(data) {
    controller.activityList.setActivity(StateManager._currentDay, data)

  }

}

class Controller {

  constructor() {
    this.activityList = new ActivityList();
    this.dayView = new DayView(this.activityList.getActivities(StateManager.getCurrentDay()));
    this.summaryView = new SummaryActivityView();
  }

  toggleSummary() {
      if (!this.summaryView.isRendered) {
        this.summaryView.render();
      }

      this.summaryView.toggleDisplay(!this.summaryView.isVisible());
  }

  updateDay(){

    if (!this.dayView.isRendered) {
      this.dayView.render();
    }
    this.dayView.update(this.activityList.getActivities(StateManager.getCurrentDay()));

  }

}


const controller = new Controller();
controller.updateDay();


