import { FILTERS } from '@/constants';

export interface TodoType {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoFetchType {
  id: number | string;
  title: string;
  completed: boolean;
}

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

export interface FilterOptionType {
  label: string;
  value: FilterType;
}
