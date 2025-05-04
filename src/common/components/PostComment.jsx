import React,{useState,useEffect, memo} from 'react'
import { Grid ,Box,InputBase, Avatar,Modal } from '@mui/material';
import { Send,EllipsisVertical } from 'lucide-react';
import CommentModal from './CommentModal';
import useUserStore from '@/store/userStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PostComment = memo(({ comments,postId,postType  }) => {
  const [newComment, setNewComment] = useState('');
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);


  useEffect(() => {

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
    if (!newComment.trim()) {
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
      const response = await fetch('https://eum-db.onrender.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        setNewComment('');
        alert('댓글 추가에 성공!');
        window.location.reload();
      } else {
        console.error('댓글 추가 실패:', response.status, response.statusText);
        alert('댓글 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
      alert('댓글 추가 중 네트워크 오류가 발생했습니다.');
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid size={12} onClick={handleOpen}
       height={'5vh'} lineHeight={'5vh'} display={'flex'} justifyContent={'flex-start'} padding={'1vh 2vw'} color={'gray'}

       >댓글 ({Array.isArray(comments) ? comments.length : 0})</Grid>
         <Grid id='comments' size={12}height={'20vh'} display={{ xs: 'none', sm: 'block' }}>
         {Array.isArray(comments) && comments.length > 0 ? (
            comments
              .filter(data => data != null)
              .map((data) => (
               <div id='comment' key={data.commentid} >
                 <Avatar variant="rounded">{data.userId}</Avatar>
                 <div className='c-name'>{data.userName}</div>
                 <div className='c-content'>{data.content}</div>
                 <div className='c-time'>{data.timestamp ? formatDate(data.timestamp) : '날짜 정보 없음'}</div>
                 <EllipsisVertical/>
               </div>
             ))
         ) : (
           Array.isArray(comments) && comments.length === 0 ? (
             <div style={{ textAlign: 'center', marginTop: '10px' }}>댓글이 없습니다.</div>
           ) : (
             <div style={{ textAlign: 'center', marginTop: '10px' }}>댓글 정보를 불러오는 중이거나 문제가 있습니다.</div>
           )
         )}

         </Grid>
            <Grid size={12} height={'5vh'} display={'flex'} padding={'0 10px'}>
            {isLoggedIn ? (
              <InputBase
                  sx={{ flex: 1, background:'rgb(228, 228, 228)', paddingLeft: 2, borderRadius:'10px' , marginRight:'1vw'}}
                  placeholder="댓글을 입력하세요."
                  inputProps={{ 'aria-label': '' }}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
              />
             ):(
              <InputBase
                  disabled
                  sx={{ flex: 1, background:'rgb(228, 228, 228)', paddingLeft: 2, borderRadius:'10px' , marginRight:'1vw'}}
                  placeholder="로그인이 필요한 기능 입니다."
                  inputProps={{ 'aria-label': '' }}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
              />
              )}
              <Box
              sx={{ width:'5vh',height:'5vh', background:'#FD9B71', borderRadius:'10px',
              display:'flex',justifyContent:'center',alignItems:'center'}}
              onClick={handleCommentSubmit}>
                <Send color='#fff'/>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                   <CommentModal comments={Array.isArray(comments) ? comments : []} postId={postId} postType={postType}/>
                </Box>
              </Modal>

      </Grid>
    </>
  )
});

export default PostComment;
