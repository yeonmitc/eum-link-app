import React,{useState,useEffect} from 'react'
import { Grid ,Box,InputBase, Avatar, } from '@mui/material';
import { Send,EllipsisVertical } from 'lucide-react';

const PostComment = ({ comments,postId,postType  }) => {
  // console.log("comments",comments);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    console.log('새 댓글 입력 값 변경됨:', newComment);
  }, [newComment]);  

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };


  const handleCommentSubmit = async () => {
    if (!newComment.trim()) { // 입력 값이 비어있으면 아무것도 안 함
      alert('댓글을 입력해주세요!');
      return;
    }
    const commentData = {
      postId: postId, 
      postType: postType, 
      userId: 'test1', 
      userName: '테스트', 
      content: newComment.trim(),
      timestamp: new Date().toISOString()
    };
  
    try {
      const response = await fetch('http://localhost:5000/comments', {
        method: 'POST', // POST 요청
        headers: {
          'Content-Type': 'application/json', // 본문이 JSON 형식임을 알림
        },
        body: JSON.stringify(commentData), // JS 객체를 JSON 문자열로 변환
      });
  
      if (response.ok) {
        // const addedComment = await response.json();
        // console.log('댓글이 성공적으로 추가되었습니다:', addedComment);
        setNewComment('');
      } else {
        console.error('댓글 추가 실패:', response.status, response.statusText);
        alert('댓글 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
      alert('댓글 추가 중 네트워크 오류가 발생했습니다.');
    }
  };

  useEffect

  return (
    <>
      <Grid size={12} height={'5vh'} lineHeight={'5vh'} display={'flex'} justifyContent={'flex-start'} padding={'1vh 2vw'} color={'gray'} >댓글 ({comments?.length === "0" ? comments?.length : "0"})</Grid>
         <Grid id='comments' size={12}height={'20vh'} display={{ xs: 'none', sm: 'block' }}>
         {comments?.map((data) => (
          <div id='comment' key={data.commentid} >
            <Avatar variant="rounded">{data.userId}</Avatar>
            <div className='c-name'>{data.userName}</div>
            <div className='c-content'>{data.content}</div>
            <div className='c-time'>{formatDate(data.timestamp)}</div>
            <EllipsisVertical/>
          </div>
          ))}

         </Grid>
            <Grid size={12} height={'5vh'} display={'flex'} padding={'0 10px'}>
              <InputBase
                  sx={{ flex: 1, background:'rgb(228, 228, 228)', paddingLeft: 2, borderRadius:'10px' , marginRight:'1vw'}}
                  placeholder="댓글을 입력하세요."
                  inputProps={{ 'aria-label': '' }}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
              />
              <Box 
              sx={{ width:'5vh',height:'5vh', background:'#FD9B71', borderRadius:'10px',
              display:'flex',justifyContent:'center',alignItems:'center'}}
              onClick={handleCommentSubmit}>
                <Send color='#fff'/>
              </Box>
      </Grid>
    </>
  )
}
export default PostComment
