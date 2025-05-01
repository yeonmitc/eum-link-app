import React from 'react'
import { Grid ,Box, Card ,InputBase} from '@mui/material';

const MissingDetailPage = () => {
  return (
    <Grid  container spacing={0} sx={{padding:'0vh 5vw', fontFamily:'Gmarket_light'}}>
      <Grid size={12} sx={{ width:'100%', display:'flex' ,color:"#fff" ,fontFamily: 'Jalnan2TTF'}}>
        <Box sx={{padding:'0vh 2vw',height: '7vh',background:' #436850',textAlign:'center' , lineHeight:'7vh',
          borderRadius:'20px 20px 0 0'
        }}>실종 신고</Box>
        <Box sx={{padding:'0vh 2vw',height: '7vh',background:' #5D9471',textAlign:'center', lineHeight:'7vh',
          borderRadius:'20px 20px 0 0'
          }}>이름 | 상세종</Box>
      </Grid>

      <Grid container size={12} >
        <Box sx={{width:'92vw',height: '72vh',background:' #F5EEDD',textAlign:'center',borderRadius:'0 20px 20px 20px', padding: '4vh 5vw'}}>
          {/* 정보카드 */}
          <Grid size={12}  sx={{width:'82vw',height: '34vh', display:'flex'}} >
              {/* 사진 */}
              <Grid size={4}>
                <Card sx={{ maxWidth: '24vw' ,maxHeight: '18vw'}}>
                  <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"/>
                </Card>
              </Grid>
              {/* 정보상세 */}
              <Grid size={4} container  spacing={1} sx={{ maxWidth: '30vw' ,maxHeight: '14vw', fontFamily: 'Gmarket_medium', color:'gray'}} >
                <Grid container size={12} spacing={0} >이름</Grid>
                <Grid container size={12} spacing={0} >종   믹스</Grid>
                <Grid container size={12} spacing={0} >성별 아이콘</Grid>
                <Grid container size={12} spacing={0} >나이 {}살</Grid>
                <Grid container size={12} spacing={0} >특징 {}</Grid>
              </Grid>
              {/* 지도 */}
              <Grid size={4}>
              <Box sx={{ width: '27vw' ,height: '18vw', background:' #fff',borderRadius:'20px'}}></Box>
              </Grid>
          </Grid>
          {/* 댓글 */}
          <Grid size={12}  sx={{width:'82vw',height: '32vh', background:' #fff',borderRadius:'20px',}}>
              <Grid size={12} height={'5vh'} lineHeight={'5vh'} display={'flex'} justifyContent={'flex-start'} padding={'1vh 2vw'} color={'gray'} >댓글()</Grid>
              <Grid size={12}height={'20vh'}></Grid>
              <Grid size={12} height={'5vh'} display={'flex'} padding={'0 10px'}>
                <InputBase
                  sx={{ flex: 1, background:'rgb(228, 228, 228)', paddingLeft: 2, borderRadius:'10px' , marginRight:'1vw'}}
                  placeholder="댓글을 입력하세요."
                  inputProps={{ 'aria-label': '' }}
                />
                <Box sx={{ width:'5vh',height:'5vh', background:'#FD9B71', borderRadius:'10px'}}></Box>
              </Grid>
          </Grid>

        </Box>
      </Grid>
      {/* 하단 버튼 */}
      <Grid size={12}sx={{ marginTop:'2vh', display:'flex' ,color:"#fff"}}>
        <Box sx={{width:'92vw',height: '6vh',background:' #436850',textAlign:'center' , lineHeight:'6vh',borderRadius:'20px'}}>
          
        </Box>
      </Grid>
    </Grid> 
  )
}

export default MissingDetailPage
