import Actions from './ActionNames';

function buildEntities(entities, areFolders) {
    let ids = [];
    let entityMap = {};

    entities.forEach( entity => {

        ids.push(entity.id);

        entityMap[entity.id] = {
            id: entity.id,
            name: entity.name,
            children: entity.folder ? {
                ids: [],
                childCount: entity.folder.childCount
            } : null,
            isFolder: areFolders
        }
    });

    return { ids, entityMap };
}

function receiveRootFolder(rootFolder) {

    const children = rootFolder.value;

    const folderInfo = buildEntities(
        children.filter( child => !!(child.folder) ),
        true
    );

    const fileInfo = buildEntities(
        children.filter( child => !child.folder ),
        false
    );

    return {
        type: Actions.ROOT_FOLDER_LOADED,
        folders: {
            ids: folderInfo.ids,
            entities: folderInfo.entityMap
        },
        files: {
            ids: fileInfo.ids,
            entities: fileInfo.entityMap
        }
    };
}

export default {
    receiveRootFolder: receiveRootFolder
};
