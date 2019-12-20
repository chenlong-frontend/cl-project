export const ResultAction = ({text ,title, icon}) => {
    return {
        type: 'SNAPSHOT_RESULT',
        icon: icon,
        title: title,
        text: text
    }
}

export const IssueAction = (data) => {
    return {
        type: 'SNAPSHOT_ISSUE',
        issue: data
    }
}