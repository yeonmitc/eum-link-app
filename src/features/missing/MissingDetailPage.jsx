import React from 'react'
import { Grid, Skeleton ,Box, Card ,InputBase} from '@mui/material';

const MissingDetailPage = () => {
  return (
    <Grid  container spacing={0} sx={{padding:'0 2vw'}}>
      <Grid size={12} sx={{ width:'100%', display:'flex' ,color:"#fff"}}>
        <Box sx={{width:'10vw',height: '7vh',background:' #436850',textAlign:'center' , lineHeight:'7vh',
          borderRadius:'20px 20px 0 0'
        }}>실종 신고</Box>
        <Box sx={{width:'10vw',height: '7vh',background:' #5D9471',textAlign:'center', lineHeight:'7vh',
          borderRadius:'20px 20px 0 0'
          }}>이름 | 상세종</Box>
      </Grid>

      <Grid container size={12} >
        <Box sx={{width:'96vw',height: '72vh',background:' #F5EEDD',textAlign:'center',borderRadius:'0 20px 20px 20px', padding:'2% 3%'}}>
          {/* 정보 */}
          <Grid size={12}  sx={{width:'92vw',height: '34vh', display:'flex'}} >
              <Grid size={4}>
                <Card sx={{ maxWidth: '22vw' ,maxHeight: '14vw'}}>
                  <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"/>
                </Card>
              </Grid>
              <Grid size={4} container  spacing={2} sx={{ maxWidth: '20vw' ,maxHeight: '14vw'}} >
                <Grid container size={12} spacing={0} >이름</Grid>
                <Grid container size={12} spacing={0} >종</Grid>
                <Grid container size={12} spacing={0} >성별</Grid>
                <Grid container size={12} spacing={0} >나이</Grid>
                <Grid container size={12} spacing={0} >특징</Grid>
              </Grid>
              <Grid size={4}>
              <Card sx={{ maxWidth: '20vw' ,maxHeight: '14vw'}}></Card>
              </Grid>
          </Grid>
          {/* 댓글 */}
          <Grid size={12}  sx={{width:'92vw',height: '34vh'}}>
            <Box sx={{width:'92vw',height: '30vh', background:' #fff',borderRadius:'20px'}} >
              <Grid size={12} height={'5vh'} lineHeight={'5vh'}>댓글</Grid>
              <Grid size={12}height={'20vh'}></Grid>
              <Grid size={12} height={'5vh'} display={'flex'}>
                <InputBase
                  sx={{ width:'60vw', flex: 1, background:'rgb(228, 228, 228)', paddingLeft: 2, borderRadius:'10px'}}
                  placeholder="댓글을 입력하세요."
                  inputProps={{ 'aria-label': '' }}
                />
                <Box sx={{ width:'5vh',height:'5vh', background:'rgb(228, 228, 228)'}}></Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Grid size={12}sx={{ marginTop:'2vh', display:'flex' ,color:"#fff"}}>
        <Box sx={{width:'96vw',height: '6vh',background:' #436850',textAlign:'center' , lineHeight:'6vh',borderRadius:'20px'}}>
          
        </Box>
      </Grid>
    </Grid> 
  )
}

export default MissingDetailPage
