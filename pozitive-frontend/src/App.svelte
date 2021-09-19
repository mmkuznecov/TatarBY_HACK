<script>

	    import { Router, Route } from "svelte-routing";
		import Home from './pages/home.svelte';
  		import Signup from './pages/signup.svelte';
  		import Recover from './pages/recover.svelte';
		import About from './pages/about.svelte';
		import NotFound from './pages/404.svelte';
		import EduApp from './education_app/main.svelte'
		import Main from './pages/main.svelte'
		import FirstPage from './education_app/pages/First.svelte'
		import SecondPage from './education_app/pages/Second.svelte'
		import ZeroPage from './education_app/pages/Zero.svelte'
  
 		export let url = "";
</script>

<Router url="{url}">
	 
	 <div>
		 <Route path="signup" component={Signup} /> 
	   	 <Route path="recover" component={Recover} /> 
	     <Route path="/"><Home /></Route>
	     <Route path="about" component={About}/>
	     <Route component="{NotFound}" />
	     <Route path="education" component={EduApp} />
		 <Route path="main" component={Main} />
		 <Route path="first" component={FirstPage} />
		 <Route path="second" component={SecondPage} />
		 <Route path="zero" component={ZeroPage} />
	 </div>
	</Router>

<style>
	
</style>