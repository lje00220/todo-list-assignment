import { QUERY_KEYS } from '@/constants';

/**
 * 쿼리키 생성 함수
 * @param filteredOption - 필터링 옵션 (all, active, completed)
 * @returns 쿼리키 배열
 */
export const getTodoQueryKey = (filteredOption: string) => {
  return [QUERY_KEYS.TODOS, filteredOption];
};
