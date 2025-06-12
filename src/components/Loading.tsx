/**
 * 로딩 UI 컴포넌트
 * @returns {JSX.Element}
 */
const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-gray-500">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
      로딩 중입니다...
    </div>
  );
};

export default Loading;
