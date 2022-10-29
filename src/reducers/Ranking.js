const getRanking = response => {
  const ranking = [];
  const itemLength = response.category_ranking.meta.total_results_returned
  for (let index = 0; index < itemLength; index++) {
    const item = response.category_ranking.ranking_data[index];
    ranking.push({
      code: item.rank,
      name: item.name,
      url: item.url,
      imageUrl: item.image.medium
    })
  }
  return ranking;
}

  const initialState = {
    category: undefined,
    ranking: undefined,
    error: false
  };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_REQUEST':
      return {
        category: action.payload.category,
        ranking: undefined,
        error: false
      };

    case 'RECEIVE_DATA':
      return action.payload.error
        ? {...state, error: true}
        : {
          ...state,
          ranking: getRanking(action.payload.response)
        };

    default:
      return state;
  }
}

