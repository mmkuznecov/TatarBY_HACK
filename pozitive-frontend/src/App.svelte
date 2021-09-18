<script>

	    import { Router, Route } from "svelte-routing";
		import Home from './pages/home.svelte';
  		import Signup from './pages/signup.svelte';
  		import Recover from './pages/recover.svelte';
		import About from './pages/about.svelte';
		import NotFound from './pages/404.svelte';
		import EduApp from './education_app/main.svelte'
  
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
	 </div>
	</Router>

<style>
	
</style>