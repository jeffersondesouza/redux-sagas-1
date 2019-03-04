export default function counter(state = 0, action) {
  console.log(action);

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'INCREMENT_IF_ODD':
      return state % 2 !== 0 ? state + 1 : state;
    case 'DECREMENT':
      return state - 1;

    case 'FETCH_SUCCESS':
      return state + action.data.length;

    case 'FETCH_FAILURE':
      return 666;

    default:
      return state;
  }
}
