const reducers = (state = [], action) => {
    console.log(action)
    switch (action.type) {
        case 'SNAPSHOT_RESULT':
            return {text: action.text, title: action.title, icon: action.icon}
        case 'SNAPSHOT_ISSUE':
            return {issue: action.issue}
        case 'MONITOR_INDEX':
            return {cameraData: action.cameraData, index: action.index, chooseId: action.chooseId}
        case 'MONITOR_ALBUM':
            return {picData: action.picData}
        case 'HOME-INDEX':
            return {news_id: action.news_id}
        case 'NAV':
            return {navTitle: action.title, navSearch: action.search, navSort: action.sort}
        default:
            return state
    }
}

export default reducers