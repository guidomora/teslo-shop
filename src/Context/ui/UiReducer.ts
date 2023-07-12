import { UiState } from "./UiProvider";


type UiActionType = 
| {type: "[UI] - ToggleMenu" }

// Recibe un estado/accion y produce un nuevo estado
export const uiReducer = (state: UiState, action:UiActionType): UiState => {
    switch (action.type) {
        case "[UI] - ToggleMenu":
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen // cambia el valor por el contrario
            }
    
        default:
            return state;
    }
}