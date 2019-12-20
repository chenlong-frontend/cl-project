export const ResultAction = ({cameraData, index, chooseId}) => {
    return {
        type: 'MONITOR_INDEX',
        cameraData: cameraData,
        index: index,
        chooseId: chooseId
    }
}

export const ExportPic = (picData) => {
    return {
        type: 'MONITOR_ALBUM',
        picData: picData
    }
}