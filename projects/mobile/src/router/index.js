import asyncComponent from './async-component'

// 问题：由于webpack需要一些文件位置信息。import()必须至少包含关于模块所在位置的一些信息，无法完全动态
let components = {};
components.workflowIndex = asyncComponent(() => import('../view/workflow/index'));
components.workflowWorking = asyncComponent(() => import('../view/workflow/working'));
components.workflowDeal = asyncComponent(() => import('../view/workflow/deal'));
components.workflowLaunch = asyncComponent(() => import('../view/workflow/launch'));
components.workflowStart = asyncComponent(() => import('../view/workflow/start'));
components.snapshotIndex = asyncComponent(() => import('../view/snapshot/index'));
components.snapshotIssueWrite = asyncComponent(() => import('../view/snapshot/issueWrite'));
components.snapshotIssueReWrite = asyncComponent(() => import('../view/snapshot/issueReWrite'));
components.snapshotProcess = asyncComponent(() => import('../view/snapshot/process'));
components.snapshotProcessRead = asyncComponent(() => import('../view/snapshot/processRead'));
components.snapshotConfirm = asyncComponent(() => import('../view/snapshot/confirm'));
components.snapshotConfirmRead = asyncComponent(() => import('../view/snapshot/confirmRead'));
components.snapshotIllustrate = asyncComponent(() => import('../view/snapshot/illustrate'));
components.snapshotIssueVerify = asyncComponent(() => import('../view/snapshot/issueVerify'));
components.snapshotIssueVerifyRead = asyncComponent(() => import('../view/snapshot/issueVerifyRead'));
components.snapshotIssueReWriteRead = asyncComponent(() => import('../view/snapshot/issueReWriteRead'));
components.snapshotProcessReport = asyncComponent(() => import('../view/snapshot/processReport'));
components.snapshotProcessSubmit = asyncComponent(() => import('../view/snapshot/processSubmit'));
components.snapshotResult = asyncComponent(() => import('../view/snapshot/result'));
components.snapshotStateChange = asyncComponent(() => import('../view/snapshot/stateChange'));
components.snapshotVerifyFailSubmit = asyncComponent(() => import('../view/snapshot/verifyFailSubmit'));
components.snapshotVerifySubmit = asyncComponent(() => import('../view/snapshot/verifySubmit'));
components.attendanceIndex = asyncComponent( () => import('../view/attendance/index.js'));
components.userinfoIndex = asyncComponent( () => import('../view/userinfo/index.js'));
components.userinfoEdit = asyncComponent( () => import('../view/userinfo/edit.js'));
components.statisticsIndex = asyncComponent( () => import('../view/statistics/index.js'));
components.vrIndex = asyncComponent( () => import('../view/vr/index.js'));
components.vrExperience = asyncComponent( () => import('../view/vr/experience.js'));
components.vrComments = asyncComponent( () => import('../view/vr/comments.js'));
components.vrHasComments = asyncComponent( () => import('../view/vr/hasComments.js'));
components.homeIndex = asyncComponent( () => import('../view/home/index.js'));
components.homeNews = asyncComponent( () => import('../view/home/news.js'));
components.homeDetail = asyncComponent( () => import('../view/home/detail.js'));
components.monitorIndex = asyncComponent( () => import('../view/monitor/index.js'));
components.monitorAlbumWatch = asyncComponent( () => import('../view/monitor/albumWatch.js'));
components.monitorCameraWatch = asyncComponent( () => import('../view/monitor/cameraWatch.js'));
components.monitorCamera = asyncComponent( () => import('../view/monitor/camera.js'));
components.monitorList = asyncComponent( () => import('../view/monitor/list.js'));
components.monitorAlbum = asyncComponent( () => import('../view/monitor/album.js'));
components.filemanageIndex = asyncComponent( () => import('../view/filemanage/index.js'));
components.filemanageWork = asyncComponent( () => import('../view/filemanage/work.js'));
components.filemanageMyup = asyncComponent( () => import('../view/filemanage/myup/myup.js'));
components.filemanageMyupDetail = asyncComponent( () => import('../view/filemanage/myup/myup-detail.js'));
components.filemanageShare = asyncComponent( () => import('../view/filemanage/share/share.js'));
components.filemanageShareDetail = asyncComponent( () => import('../view/filemanage/share/shareDetail.js'));
components.filemanageFilePreview = asyncComponent( () => import('../view/filemanage/filePreview.js'));
components.filemanageIssueVerify = asyncComponent( () => import('../view/filemanage/issueVerify.js'));

const routerConfig = [
    {router_json: '{"path":"/workflow-index","component":"workflowIndex"}'},
    {router_json: '{"path":"/workflow-working","component":"workflowWorking"}'},
    {router_json: '{"path":"/workflow-deal","component":"workflowDeal"}'},
    {router_json: '{"path":"/workflow-launch","component":"workflowLaunch"}'},
    {router_json: '{"path":"/workflow-start","component":"workflowStart"}'},
    {router_json: '{"path":"/snapshot-index","component":"snapshotIndex"}'},
    {router_json: '{"path":"/snapshot-process/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotProcess"}'},
    {router_json: '{"path":"/snapshot-processRead/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotProcessRead"}'},
    {router_json: '{"path":"/snapshot-issueWrite","component":"snapshotIssueWrite"}'},
    {router_json: '{"path":"/snapshot-issueReWrite/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotIssueReWrite"}'},
    {router_json: '{"path":"/snapshot-issueReWriteRead/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotIssueReWriteRead"}'},
    {router_json: '{"path":"/snapshot-confirm/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotConfirm"}'},
    {router_json: '{"path":"/snapshot-confirmRead/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotConfirmRead"}'},
    {router_json: '{"path":"/snapshot-illustrate","component":"snapshotIllustrate"}'},
    {router_json: '{"path":"/snapshot-issueVerify/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotIssueVerify"}'},
    {router_json: '{"path":"/snapshot-issueVerifyRead/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotIssueVerifyRead"}'},
    {router_json: '{"path":"/snapshot-processReport","component":"snapshotProcessReport"}'},
    {router_json: '{"path":"/snapshot-processSubmit/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotProcessSubmit"}'},
    {router_json: '{"path":"/snapshot-result","component":"snapshotResult"}'},
    {router_json: '{"path":"/snapshot-stateChange","component":"snapshotStateChange"}'},
    {router_json: '{"path":"/snapshot-verifyFailSubmit/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotVerifyFailSubmit"}'},
    {router_json: '{"path":"/snapshot-verifySubmit/:cur_node_id/:is_edit/:history_id/:record_id/:form_table_name/:form_id/:flow_id/:form_table_id/:history_time","component":"snapshotVerifySubmit"}'},
    {router_json: '{"path":"/attendance-index","component":"attendanceIndex"}'},
    {router_json: '{"path":"/userinfo-index","component":"userinfoIndex"}'},
    {router_json: '{"path":"/userinfo-edit","component":"userinfoEdit"}'},
    {router_json: '{"path":"/statistics-index","component":"statisticsIndex"}'},
    {router_json: '{"path":"/vr-index","component":"vrIndex"}'},
    {router_json: '{"path":"/vr-experience","component":"vrExperience"}'},
    {router_json: '{"path":"/vr-comments","component":"vrComments"}'},
    {router_json: '{"path":"/vr-hasComments","component":"vrHasComments"}'},
    {router_json: '{"path":"/home-index","component":"homeIndex"}'},
    {router_json: '{"path":"/home-news","component":"homeNews"}'},
    {router_json: '{"path":"/home-detail/:id","component":"homeDetail"}'},
    {router_json: '{"path":"/monitor-index","component":"monitorIndex"}'},
    {router_json: '{"path":"/monitor-album-watch/:album_id","component":"monitorAlbumWatch"}'},
    {router_json: '{"path":"/monitor-camera-watch/:index/:number/:id/:fileId","component":"monitorCameraWatch"}'},
    {router_json: '{"path":"/monitor-camera","component":"monitorCamera"}'},
    {router_json: '{"path":"/monitor-list","component":"monitorList"}'},
    {router_json: '{"path":"/monitor-album","component":"monitorAlbum"}'},
    {router_json: '{"path":"/filemanage-index","component":"filemanageIndex"}'},
    {router_json: '{"path":"/filemanage-work","component":"filemanageWork"}'},
    {router_json: '{"path":"/filemanage-myup","component":"filemanageMyup"}'},
    {router_json: '{"path":"/filemanage-myup-detail/:index/:type/:from","component":"filemanageMyupDetail"}'},
    {router_json: '{"path":"/filemanage-share","component":"filemanageShare"}'},
    {router_json: '{"path":"/filemanage-shareDetail","component":"filemanageShareDetail"}'},
    {router_json: '{"path":"/filemanage-filePreview","component":"filemanageFilePreview"}'},
    {router_json: '{"path":"/filemanage-issueVerify","component":"filemanageIssueVerify"}'}
];

let routes = [];
for (let value of routerConfig) {
    if (value.router_json.length > 0) {
        let routerJson = JSON.parse(value.router_json);
        let routerMenu = {path: routerJson.path};
        routerMenu.component = components[routerJson.component];
        routes.push(routerMenu)
    }
}



export default routes