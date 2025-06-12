import { create } from "zustand";
import type { SetType } from "../constants/setsType";

interface Movement {
  id: string;
  name: string;
  type: SetType;
  set_count: number;
  rep_count: number;
  rest_time: number;
  weight: number;
  weight_unit: "kg" | "lb";
  tempo: string;
  movement_description: string;
}

interface MovementState {
  currentSetType: SetType | null;
  currentSetData: Movement | null;
  groups: Record<
    string,
    {
      type: SetType;
      set_count: number;
      rest_time: number;
      movements: Movement[];
    }
  >;

  // Actions
  setCurrentSetType: (type: SetType) => void;
  setSetCount: (count: number) => void;
  setMovementName: (name: string) => void;
  setRepCount: (count: number) => void;
  setRestTime: (time: number) => void;
  setWeight: (weight: number) => void;
  setWeightUnit: (unit: "kg" | "lb") => void;
  setTempo: (tempo: string) => void;
  setMovementDescription: (description: string) => void;

  // Group Management
  addGroup: (type: SetType) => void;
  getGroup: (id: string) =>
    | {
        type: SetType;
        set_count: number;
        rest_time: number;
        movements: Movement[];
      }
    | undefined;
  updateGroup: (
    id: string,
    data: Partial<{
      set_count: number;
      rest_time: number;
      movements: Movement[];
    }>
  ) => void;
  addMovementToGroup: (groupId: string, movement: Movement) => void;
  removeMovementFromGroup: (groupId: string, movementId: string) => void;
}

export const useMovementStore = create<MovementState>((set) => ({
  currentSetType: null,
  currentSetName: "",
  currentSetData: null,
  groups: {},

  setCurrentSetType: (type) => {
    set((state) => ({
      currentSetType: type,
      currentSetData: {
        id: "",
        name: "",

        type,
        set_count: 3,
        rep_count: 10,
        rest_time: 60,
        weight: 0,
        weight_unit: "kg",
        tempo: "",
        movement_description: "",
      },
    }));
  },

  setSetCount: (count) => {
    set((state) => ({
      currentSetData: state.currentSetData
        ? { ...state.currentSetData, set_count: count }
        : null,
    }));
  },

  setRepCount: (count) => {
    set((state) => ({
      currentSetData: state.currentSetData
        ? { ...state.currentSetData, rep_count: count }
        : null,
    }));
  },

  setRestTime: (time) => {
    set((state) => ({
      currentSetData: state.currentSetData
        ? { ...state.currentSetData, rest_time: time }
        : null,
    }));
  },

  setWeight: (weight) => {
    set((state) => ({
      currentSetData: state.currentSetData
        ? { ...state.currentSetData, weight }
        : null,
    }));
  },

  setWeightUnit: (unit) => {
    set((state) => ({
      currentSetData: state.currentSetData
        ? { ...state.currentSetData, weight_unit: unit }
        : null,
    }));
  },

  setTempo: (tempo) => {
    set((state) => ({
      currentSetData: state.currentSetData
        ? { ...state.currentSetData, tempo }
        : null,
    }));
  },

  setMovementDescription: (description) => {
    set((state) => ({
      currentSetData: state.currentSetData
        ? { ...state.currentSetData, movement_description: description }
        : null,
    }));
  },

  // Group Management
  addGroup: (type) =>
    set((state) => ({
      groups: {
        ...state.groups,
        [crypto.randomUUID()]: {
          type,
          set_count: 3,
          rest_time: 60,
          movements: [],
        },
      },
    })),

  getGroup: (
    id: string
  ):
    | {
        type: SetType;
        set_count: number;
        rest_time: number;
        movements: Movement[];
      }
    | undefined => {
    const state = useMovementStore.getState();
    return state.groups[id];
  },

  updateGroup: (id, data) =>
    set((state) => ({
      groups: {
        ...state.groups,
        [id]: {
          ...state.groups[id],
          ...data,
        },
      },
    })),

  addMovementToGroup: (groupId, movement) =>
    set((state) => ({
      groups: {
        ...state.groups,
        [groupId]: {
          ...state.groups[groupId],
          movements: [...state.groups[groupId].movements, movement],
        },
      },
    })),

  removeMovementFromGroup: (groupId, movementId) =>
    set((state) => ({
      groups: {
        ...state.groups,
        [groupId]: {
          ...state.groups[groupId],
          movements: state.groups[groupId].movements.filter(
            (m) => m.id !== movementId
          ),
        },
      },
    })),
  setMovementName: (name) =>
    set((state) => ({
      currentSetData: state.currentSetData
        ? { ...state.currentSetData, name }
        : null,
    })),
}));
