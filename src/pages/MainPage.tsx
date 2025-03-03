import {BottomMenu} from '../components/MainPageComponents/BottomMenu'
import {MainTop} from '../components/MainPageComponents/MainTop'
import Request from '../helpers/Request'

interface ApiResponse {
  success: boolean;
  message: string;
}

function MainPage() {
  const { responseData, error } = Request<ApiResponse>({
    method: "GET",
    url: "/me",
  });
  console.log(error);
  return (
    <>
        <MainTop/>
        <h1>{responseData ? JSON.stringify(responseData) : 'No user data'}</h1>
        <div style={{height: '1000px'}}></div>
        <BottomMenu/>
    </>
  )
}

export default MainPage