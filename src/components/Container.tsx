interface ContainerProps {
  children: React.ReactNode;
}

/**
 * 상단 컨테이너 컴포넌트
 * @param children - 컨테이너 내부에 렌더링할 자식 요소들
 * @returns {JSX.Element}
 */
const Container = ({ children }: ContainerProps) => {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex h-[80vh] w-full flex-col rounded-lg bg-white py-10 shadow-xl sm:h-[70vh] sm:w-2/3 md:w-3/5 lg:w-1/2">
        {children}
      </div>
    </main>
  );
};

export default Container;
