export default (parent) => {
  while (parent.firstChild) { //parent의 첫번째 자식을 반환합니다.
      parent.removeChild(parent.firstChild); // removeChild 자식 노드를 제거합니다.
  }
}