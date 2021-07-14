export default class ActivityView {
  constructor(id, props) {
    this.el = document.getElementById(id)
    this.props = props
    this.id = id
  }
  render() {
    const template = document.getElementById("activityTpl")
    const tplClone = template.content.firstElementChild.cloneNode(true)
    this.el.appendChild(tplClone)
    this.el.querySelector("#activityName").innerHTML = this.getActivityName(
      this.id
    )
    this.update(this.props)
  }
  update(props) {
    this.el.querySelector("#start").value = props.start
    this.el.querySelector("#end").value = props.end
    this.el.querySelector("#type").value = props.type
  }
  getActivityName(type) {
    return {
      morning: "Dimineata",
      evening: "Seara",
    }[type]
  }
  getData() {
    return {
      start: this.el.querySelector("#start").value,
      end: this.el.querySelector("#end").value,
      type: this.el.querySelector("#type").value,
    }
  }
}
