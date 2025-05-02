import React from 'react'
import './ReportDetailPage.css'
import { Grid ,Box, Card ,InputBase} from '@mui/material';
import { EllipsisVertical } from 'lucide-react';
import PostComment from '@/common/components/PostComment';


const ReportDetailPage = () => {
  return (
<Grid  container spacing={0} sx={{padding:'0vh 5vw', fontFamily:'Gmarket_light'}}>
      <Grid size={12} sx={{ width:'100%', display:'flex' ,color:"#fff" ,fontFamily: 'Jalnan2TTF'}}>
         <Box id='postnav' sx={{background:' #436850'}}>목격 제보</Box>
        <Box  id='postnav' sx={{background:' #5D9471'}}>특징일곱글자까지 ...</Box>
      </Grid>

      <Grid container size={12} >
        <Box id='post' sx={{width:'92vw',height: '72vh',textAlign:'center',borderRadius:'0 20px 20px 20px', padding: '4vh 5vw'}}>
          <EllipsisVertical id='postmenu'/>
          {/* 정보카드 */}
          <Grid size={12}  sx={{width:'82vw',height: '34vh', display:'flex'}} >
              {/* 사진 */}
              <Grid size={4}>
                <Card sx={{ maxWidth: '24vw' ,height: '30vh'}}>
                  <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"/>
                </Card>
              </Grid>
              {/* 정보상세 */}
              <Grid size={4} container  spacing={1} sx={{ maxWidth: '30vw' ,maxHeight: '30vh', fontFamily: 'Gmarket_medium', color:'gray'}} >
                <Grid container size={12} spacing={0} >특징</Grid>
                <Grid container size={12} spacing={0} >종   믹스</Grid>
                <Grid container size={12} spacing={0} >발견시간 </Grid>
                <Grid container size={12} spacing={0} >특징 {}</Grid>
              </Grid>
              {/* 지도 */}
              <Grid size={4}>
              <Box sx={{ width: '27vw' ,height: '30vh', background:' #fff',borderRadius:'20px'}}></Box>
              </Grid>
          </Grid>
          {/* 댓글 */}
          <Grid size={12}  sx={{width:'82vw',height: '32vh', background:' #fff',borderRadius:'20px',}}>
              <PostComment/>
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

export default ReportDetailPage
