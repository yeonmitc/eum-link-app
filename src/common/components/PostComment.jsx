import React from 'react'
import { Grid ,Box,InputBase} from '@mui/material';
import { Send } from 'lucide-react';

const PostComment = () => {
  return (
    <>
      <Grid size={12} height={'5vh'} lineHeight={'5vh'} display={'flex'} justifyContent={'flex-start'} padding={'1vh 2vw'} color={'gray'} >댓글()</Grid>
         <Grid size={12}height={'20vh'}></Grid>
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
