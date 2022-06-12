
export const getItemsByColumnId = () => {
  const query = `query ($boardId: [Int]!, $columnId: [String]){
    boards(ids: $boardId){
      items {
        name
        column_values(ids: $columnId){
          id
          value
        }
      }
    }
  }`
  return query;
}

export const getAllItemsFromBoard = () => {
  const query = `query ($boardIds: [Int]!){
    boards (ids:$boardIds) {
      items {
        id
        name
      }
    }
  }`
  return query;
}

export const getGroupsByBoard = () => {
  const query = `query($boardIds: [Int]!) {
    boards (ids: $boardIds) {
      groups {
        title
        id
      }
    }
  }`
  return query;
}

export const getItemsByGroupId = () => {
  const query = `query ($boardIds: [Int]!, $groupId: [String]!){
    boards (ids:$boardIds) {
      groups (ids: $groupId){
        items{
          id
          name
          column_values{
            id
            title
            value
          }
        }
      }
    }
  }`
  return query;
}

export const createItem = () => {
  const mutation = `mutation($boardId: Int!) {
    create_item (board_id: $boardId, item_name: "Welcome") {
      id
    }
  }`
  return mutation;
}

export const createNewColumn = () => {
  const mutation = `mutation ($boardId: Int!, $title: String!, $columnType: ColumnType!){
    create_column (board_id: $boardId, title: $title, column_type: $columnType) {
      id
    }
  }`
  return mutation;
}

export const createNewGroup = () => {
  const mutation = `mutation ($boardId: Int!, $groupName: String!){
    create_group(board_id: $boardId, group_name: $groupName){
      id
    }
  }`
  return mutation;
}

export const createNewBoard = () => {
  const mutation = `mutation ($boardName: String!, $templateBoardId: Int!, $workspaceId: Int!){
    duplicate_board(board_id: $templateBoardId, duplicate_type: duplicate_board_with_structure, board_name: $boardName, keep_subscribers: true, workspace_id: $workspaceId) {
      board {
          id
      }
    }
  }`
  return mutation;
}

export const createNewItemInGroup = () => {
  const mutation = `mutation ($boardId: Int!, $groupId: String!, $itemName: String!, $columnValues: JSON ) {
    create_item (board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
      id
    }
  }`
  return mutation;
}

export const deleteItemById = () => {
  const mutation = `mutation($itemId: Int!) {
    delete_item (item_id: $itemId) {
      id
    }
  }`
  return mutation;
}