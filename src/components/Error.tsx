import Container from './Container';

/**
 * 에러 UI 컴포넌트
 * @returns {JSX.Element}
 */
const Error = () => {
  return (
    <Container>
      <div className="my-auto flex flex-col items-center justify-center gap-5">
        <p className="text-xl text-red-500">
          데이터를 불러오는 데 실패했습니다.
        </p>
        <button
          onClick={() => location.reload()}
          className="text-md rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          새로고침
        </button>
      </div>
    </Container>
  );
};

export default Error;
