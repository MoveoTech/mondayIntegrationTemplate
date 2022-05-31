export const queries = {

    getItemsByColumnId: `query ($boardId: [Int]!, $columnId: [String]){
        boards(ids: $boardId){
          items {
            name
            column_values(ids: $columnId){
              id
              value
              }
            }
          }
        }`,

    getAllItemsFromBoard: `query ($boardIds: [Int]!){
        boards (ids:$boardIds) {
            items {
                  id
                  name
            }
          }
        }`,

    getGroupsByBoard: `query($boardIds: [Int]!) {
            boards (ids: $boardIds) {
              groups{
                title
                id
              }
            }
        }`,

    getItemsByGroupId: `query ($boardIds: [Int]!, $groupId: [String]!){
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
        }`,

    createItem: `mutation($boardId: Int!) {
        create_item (board_id: $boardId, item_name: "Welcome") {
            id
            }
        }`,

    createNewColumn: `mutation ($boardId: Int!, $title: String!, $columnType: ColumnType!){
        create_column (board_id: $boardId, title: $title, column_type: $columnType) {
            id
          }
        }`,

    createNewGroup: `mutation ($boardId: Int!, $groupName: String!){
        create_group(board_id: $boardId, group_name: $groupName){
            id
          }
        }`,

    createNewBoard: `mutation ($boardName: String!, $templateBoardId: Int!, $workspaceId: Int!){
            duplicate_board(board_id: $templateBoardId, duplicate_type: duplicate_board_with_structure, board_name: $boardName, keep_subscribers: true, workspace_id: $workspaceId) {
                board {
                    id
                }
            }
        }`,

    createNewItemInGroup: `mutation($boardId: Int!, $groupId: String!, $itemName: String!, $columnValues: JSON ) {
            create_item (board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
                id
            }
        }`,

    deleteItemById: `mutation($itemId: Int!) {
        delete_item (item_id: $itemId) {
            id
            }
        }`,
}