import f from'fs'
let{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,W,P,G,N,a,h,j,l,u,x,L=z=>z<-1?'u':z>1?'d':z<0?'l':'r',B=(o,b,s)=>{let d={[s]:0},q=[s];for(let x of q)for(let z of N){let n=x+z;if(!o[n]||b.includes(n)||d[n]+1)continue;d[n]=d[x]+1;q.push(n)}return d},K=(o,b,x,y)=>{let d=B(o,b,x),s='',n=y,z;if(!(d[y]+1))return null;while(n!=x)s=L(-(z=N.find(z=>d[n+z]==d[n]-1)))+s,n+=z;return s},$=t=>{
W=t.indexOf('\n')+2;N=[-W,W,-1,1];P=[],G=[]
let m=[],p=0,i=W+1
for(let Y of t){if(Y<' ')i+=2;else{if(Y!='#'){P[i]=1;if(Y>'%'&&Y<'@')G[i]=1;if(Y=='$'||Y=='*')m.push(i);if(Y=='+'||Y=='@')p=i}i++}}
let r='';u=p
R:for(let b of m){if(P[b]>1)continue;a=[b],h=[],x={[b]:1}
for(let c of a)for(let z of N){let n=c+z;if(P[n]&&(n/W|0)==(p/W|0))h.push(n),x[n]=1;else if(P[n]==1)P[n]=2,a.push(n),x[n]=1}
j=m.filter(x=>a.includes(x)),l=a.filter(c=>G[c])
r+=K(P,[],u,h[0]);u=h[0]
let C=l.map(g=>B(x,[],g))
for(let s of a)if(!G[s]&&(!C.some(d=>d[s]+1)||!(P[s-W]*P[s+W]|P[s-1]*P[s+1])))P[s]=3
let E=b=>b.reduce((s,x)=>s+Math.min(...C.map(d=>d[x]??1e9)),0),F=E(j),Q=[],M=F,n=0,A=[[,u,,0,j]],D={},q=(i,v)=>{(Q[v]??=[]).push(i);n++;if(v<M)M=v}
D[j+':'+u]=0;q(0,F)
while(n){
while(!Q[M]?.length)M++
let s=Q[M].pop(n--),[,H,,g,b]=A[s],d=B(x,b,H)
if(D[b+':'+H]!==g)continue
if(b.every(x=>G[x])&&h.some(e=>d[e]+1)){
let J=[],S=[...j],v='',y=u,t=s;while(t>0)J=[A[t],...J],t=A[t][0]
for(let[,T,z]of J){v+=K(x,S,y,T-z)+L(z);S[S.indexOf(T)]=T+z;y=T}
let w,e=h.find(e=>(w=K(x,S,y,e))!==null);r+=v+w;u=e;continue R}
for(let U in b)for(let z of N){let c=b[U],V=c+z
if(!x[V]||b.includes(V)||!(d[c-z]+1)||P[V]>2)continue
let X=[...b];X[U]=V;X.sort()
let k=X+':'+c;if(D[k]<=g+1)continue
if(E(X)>1e8)continue
D[k]=g+1;q(A.push([s,c,z,g+1,X])-1,g+1+E(X))}
}
return''}
return r}
for(let Z of f.readdirSync(I))f.mkdirSync(O+'/'+Z,{recursive:!0}),f.writeFileSync(O+'/'+Z+'/solution.txt',$(f.readFileSync(I+'/'+Z+'/level.txt')+''))
