import React from 'react'
import { Grid ,Box,InputBase, Avatar, } from '@mui/material';
import { Send,EllipsisVertical } from 'lucide-react';

const PostComment = ({ comments }) => {
  // console.log("comments",comments);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };


  return (
    <>
      <Grid size={12} height={'5vh'} lineHeight={'5vh'} display={'flex'} justifyContent={'flex-start'} padding={'1vh 2vw'} color={'gray'} >댓글 ({comments?.length === "0" ? comments?.length : "0"})</Grid>
         <Grid id='comments' size={12}height={'20vh'}>
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
              />
              <Box 
              sx={{ width:'5vh',height:'5vh', background:'#FD9B71', borderRadius:'10px',
              display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Send color='#fff'/>
              </Box>
      </Grid>
    </>
  )
}
export default PostComment
