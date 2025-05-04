// 한글 주석: 로딩 스피너 컴포넌트
const Loading = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <div style={{
      display: 'inline-block',
      width: 80,
      height: 80,
      border: '10px solid #e0e0e0',
      borderTop: '10px solid #436850',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loading; 
