from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User,Group
from django.contrib.auth.hashers import check_password
from qstn.models import Questions
import json
import re

def loginpage(request):
	return render(request,"login.html")

def signuppage(request):
	return render(request,"signup.html")

def signupfn(request):
	dict1={}
	try:
		designation=request.POST['designation']
		uname=request.POST['txt_uname']	
		pwd=request.POST['txt_pwd']
		cpwd=request.POST['txt_cpwd']
		
		if(pwd==cpwd and designation!="Designation"):
			x=User.objects.create_user(is_superuser="0",username=uname,password=pwd)
			x.save()
			dict1["status"]=True
		if(designation=="Designation"):
			dict1["val1"]="Designation"
			dict1["status"]=True
		if(designation=="admin" and cpwd==pwd):
			u=User.objects.get(username=uname)
			g=Group.objects.get(name='admin')
			u.groups.add(g)
			u.save()
			dict1["val2"]="Admin"
			dict1["status"]=True
		if(designation=="user" and cpwd==pwd):
			u=User.objects.get(username=uname)
			g=Group.objects.get(name='user')
			u.groups.add(g)
			u.save()
			dict1["val3"]="User"
			dict1["status"]=True
		if(cpwd!=pwd):
			dict1["val4"]="Password incorrect!!!"
			dict1["status"]=True
	except Exception as e:
		print("approve function->",e)

		lis=[]
		obj = User.objects.all()
		for x in obj:
			lis.append(x.username)
		if uname in lis:
			dict1["val5"]="Username Already Exist"
			dict1["status"]=False
		else:
			dict1["status"]=False
	print(dict1)
	jsondata=json.dumps(dict1)
	return HttpResponse(jsondata,content_type="application/json")

def loginfn(request):
	dict2={}
	uname = request.POST['txt_uname']
	pwd=request.POST['txt_pwd']
	
	select=''
	try:
		obj3=User.objects.get(username=uname)
		groupId=obj3.groups.get()
		groupName=Group.objects.get(id=groupId.id)
		
		select += obj3.username+" : "+obj3.password+" \n"
		
		print(obj3.username," ---> ",obj3.password)

		matchcheck= check_password(pwd, obj3.password)
		if matchcheck:
			if(groupName.name=="admin"):
				dict2["val1"]="admin"
				
			elif(groupName.name=="user"):
				dict2["val2"]="user"
				
		
		else:
			dict2["val3"]="Wrong Password"
		dict2["status"]=True
	except Exception as e:
		print(e)
		dict2["status"]=False
		
	print(dict2)
	jsondata=json.dumps(dict2)
	return HttpResponse(jsondata,content_type="application/json")


def addqstnpage(request):
	return render(request,"addquestions.html")

def viewqstnpage(request):
	return render(request,"viewquestionset.html")

def addqstnfn(request):
	dict3={}
	try:
		st=request.POST['setname']
		print(st)
		request.session["set_no"]=st
		qstn=request.POST['txt_qstn']
		opt1=request.POST['txt_opt1']
		opt2=request.POST['txt_opt2']
		opt3=request.POST['txt_opt3']
		opt4=request.POST['txt_opt4']
		ans=request.POST['sel_answer']
			
		lis=[]
		lis1=[]
		
		lis1.append(opt1)
		lis1.append(opt2)
		lis1.append(opt3)
		lis1.append(opt4)
		obj = Questions.objects.all()
		for x in obj:
			q=x.question
			lis.append(q)
		y=len(lis)
		print("length of lis:",len(lis))
		if(qstn in lis):
			dict3["val1"]="Question Already Exist"
			dict3["status"]=True
		
		elif(qstn !="" and opt1 !="" and opt2 !="" and opt3 !="" and opt4 !="" and ans !="" and len(lis)<=10 ):
			x=Questions(question=qstn,option1=opt1,option2=opt2,option3=opt3,option4=opt4,answer=ans,sid=st)
			x.save()
			
			
			dict3["val3"]="Data saved successfully"
			dict3["status"]=True
		
		elif(qstn !="" and opt1 !="" and opt2 !="" and opt3 !="" and opt4 !="" and ans !="" and len(lis)>10 and len(lis)<=20):
			x=Questions(question=qstn,option1=opt1,option2=opt2,option3=opt3,option4=opt4,answer=ans,sid=st)
			x.save()
			dict3["val3"]="Data saved successfully"
			dict3["status"]=True
		elif(qstn !="" and opt1 !="" and opt2 !="" and opt3 !="" and opt4 !="" and ans !="" and len(lis)>20 and len(lis)<=30):
			x=Questions(question=qstn,option1=opt1,option2=opt2,option3=opt3,option4=opt4,answer=ans,sid=st)
			x.save()
			dict3["val3"]="Data saved successfully"
			dict3["status"]=True

	except Exception as e:
		print("Error",e)
		dict3["status"]=False
	print(dict3)
	jsondata=json.dumps(dict3)
	return HttpResponse(jsondata,content_type="application/json")

def viewqstnpage1(request):
	try:
		print(request.POST)	
		if 'btn_submit1' in request.POST:
			st=1
		elif 'btn_submit2' in request.POST:
			st=2				
		elif 'btn_submit3' in request.POST:
			st=3
		elif 'btn_submit' in request.POST:
			return render(request,"viewresult.html",checkradio(request))
		print("set:",st)
		request.session['St']=st
		return render(request,"viewquestions.html")
	except Exception as e:
		print("viewquestonpage Error:  ",e)

 	

def viewfn(request):
	#return render(request,"exam.html")
	print("inside view function ")
	
	try:

		st=request.session['St']
		request.session['St']=st
		#st=1	
		dict4={}
		select=''
		obj = Questions.objects.filter(sid=st)	
		lis=[]
		lis1=[]
		lis2=[]
		divS=""
		qstId=1
		for x in obj:
			optId=1
			divS=divS+"<p>"+str(qstId)+"."+x.question+"</p><br>"
			divS=divS+"<input type=\"radio\" name=\"option"+str(qstId)+"\" value=\"option"+str(optId)+"\" id= \"option"+str(qstId)+"."+str(optId)+"\">"+x.option1+"<br>"
			optId+=1
			#print("optId",optId)
			divS=divS+"<input type=\"radio\" name=\"option"+str(qstId)+"\" value=\"option"+str(optId)+"\" id= \"option"+str(qstId)+"."+str(optId)+"\">"+x.option2+"<br>"
			optId+=1
			
			divS=divS+"<input type=\"radio\" name=\"option"+str(qstId)+"\" value=\"option"+str(optId)+"\" id= \"option"+str(qstId)+"."+str(optId)+"\">"+x.option3+"<br>"
			optId+=1
			divS=divS+"<input type=\"radio\" name=\"option"+str(qstId)+"\" value=\"option"+str(optId)+"\" id= \"option"+str(qstId)+"."+str(optId)+"\">"+x.option4+"<br><br>"
			optId+=1
			qstId+=1


		divS=divS+"<form id=\"frmid\" action=\"check/\"><input type=\"submit\" name=\"btn_submit\"  id=\"btn_submit\" value=\"SUBMIT ANSWER\" style=\"background-color:rgb(60, 179, 70)\"  class=\"submit button\"><br></form>"

		print("dictionary:",lis1)
		dict4["val"]=lis
		dict4["val1"]=divS
		dict4["lis"]=lis2	
		dict4["status"]=True
	except Exception as e:
		print("view question fn",e)
		dict4["status"]=False
		print(dict4)
	jsondata=json.dumps(dict4)
	return HttpResponse(jsondata,content_type="application/json")
	

def resultpage(request):
	return render(request,"viewresult.html")

def editpage(request):
	return render(request,"editquestions.html")

def editsearch(request):
	dict4={}
	try:
		qno=request.POST['txt_qno']	
		print("qno --->",qno)	
		exam = Questions.objects.get(id = qno)
		dict4["val1"]=exam.question
		dict4["val2"]=exam.option1
		dict4["val3"]=exam.option2
		dict4["val4"]=exam.option3
		dict4["val5"]=exam.option4
		dict4["val6"]=exam.answer
		dict4["status"]=True
	except Exception as e:
		print("UpdateFunction1->",e)
		dict4["status"]=False
	print(dict4)
	jsondata=json.dumps(dict4)
	return HttpResponse(jsondata,content_type="application/json")

def editfn(request):
	dict4={}
	try:
		qno=request.POST['txt_qno']	
		question=request.POST['txt_qstn']
		option1=request.POST['txt_opt1']
		option2=request.POST['txt_opt2']
		option3=request.POST['txt_opt3']
		option4=request.POST['txt_opt4']
		answer=request.POST['txt_ans']
		
	
		exam = Questions.objects.get(id = qno)
		exam.question = question
		exam.option1 = option1
		exam.option2 = option2
		exam.option3 = option3
		exam.option4 = option4
		exam.answer = answer
				
	
		print("op:",exam.question)
		if(qno !="" and option1 != "" and option2 !="" and option3!="" and option4!="" and answer!=""):
			exam.save()
		else:
			dict4["vall"]="input field can not be null!"
		dict4["status"]=True
	except Exception as e:
		print("UpdateFunction1->",e)
		dict4["status"]=False
	print(dict4)
	jsondata=json.dumps(dict4)
	return HttpResponse(jsondata,content_type="application/json")


def viewtotal(request):
	try:	
		if 'btn_view1' in request.POST:
			print(request.POST)
			st=1
		elif 'btn_view2' in request.POST:
			st=2
			print("st:",st)	
		elif 'btn_submit3' in request.POST:
			st=3 
		print("st:",st)
		request.session['view']=st
		return render(request,"viewtotal.html")
	except Exception as e:
		print(e)
		
	

	
def checkradio(request):
	print("check radio function")
	dict5={}
	try:
		count=0
		ans=""
		for i in range(1,11):
			str1="option"+str(i)
			ans=ans+request.POST[str1]+" "			
	
		'''ans1=request.POST["option1"]
		ans2=request.POST["option2"]
		ans3=request.POST["option3"]
		ans4=request.POST["option4"]
		ans5=request.POST["option5"]	
		ans6=request.POST["option6"]
		ans7=request.POST["option7"]	
		ans8=request.POST["option8"]
		ans9=request.POST["option9"]
		ans10=request.POST["option10"]
		lis=[]
		
		for i in range(0,9):
			ans.append(ans+"i+1")'''
		print("your response",ans)
		request.session['ans']=str(ans)
		print(ans)		
		count=0
		lis=[]
		obj = Questions.objects.all()
		for x in obj:
			lis.append(x.answer)
			
		print("answer list",lis)
		if(lis[0]==ans1):
			count=count+1
		if(lis[1]==ans2):
			count=count+1
		if(lis[2]==ans3):
			count=count+1
		if(lis[3]==ans4):
			count=count+1
		if(lis[4]==ans5):
			count=count+1
		if(lis[5]==ans6):
			count=count+1
		if(lis[6]==ans7):
			count=count+1
		if(lis[7]==ans8):
			count=count+1
		if(lis[8]==ans9):
			count=count+1
		if(lis[9]==ans10):
			count=count+1
			
		request.session['mark']=count
		#request.session["lis"]=str(lis)
		#print("answer list:",request.session["lis"])
		print("mark= ",count)
		dict5["lis"]=lis
		print("List of answer:",lis)
		dict5["val"]=count
		print("mark== ",dict5["val"])
		dict5["status"]=True
		
		
	except Exception as e:
		print("Error",e)
		dict5["val1"]="You Must attend all questions"	
		dict5["status"]=False

	jsondata=json.dumps(dict5)
	return dict5


def checkresult(request):
	dict5={}
	try:
		count=request.session['mark']
		print("checkresult fn, mark= ",count)
		dict5["val"]=count
		dict5["status"]=True
	except Exception as e:
		print("Error",e)
		dict5["status"]=False

	jsondata=json.dumps(dict5)
	return HttpResponse(jsondata,content_type="application/json")


def viewtotalfn(request):
	st=request.session['St']
	print("viewtotalfn, set:",st)
	lis=[]
	#ans=[]
	ans=request.session['ans']	
	


	a=re.split(" ",ans)
	ansList=[]
	ansList.append(a)
	print("Answer List:",a,"--->",ansList)

	print("viewtotalfn, set:",ans)
	dict4={}
	select=''
	try:

		
		obj = Questions.objects.all()
		for x in obj:
			lis.append(x.answer)
	

		obj = Questions.objects.filter(sid=st)	
		divS=""
		qstId=1
		for x in obj:
			optId=1
			divS=divS+"<p>"+str(qstId)+"."+x.question+"</p><br>"
			divS=divS+"<input type=\"radio\" name=\"option"+str(qstId)+"\" value=\"option"+str(optId)+"\" id= \"option"+str(qstId)+"."+str(optId)+"\">"+x.option1+"<br>"
			optId+=1
			#print("optId",optId)
			divS=divS+"<input type=\"radio\" name=\"option"+str(qstId)+"\" value=\"option"+str(optId)+"\" id= \"option"+str(qstId)+"."+str(optId)+"\">"+x.option2+"<br>"
			optId+=1
			
			divS=divS+"<input type=\"radio\" name=\"option"+str(qstId)+"\" value=\"option"+str(optId)+"\" id= \"option"+str(qstId)+"."+str(optId)+"\">"+x.option3+"<br>"
			optId+=1
			divS=divS+"<input type=\"radio\" name=\"option"+str(qstId)+"\" value=\"option"+str(optId)+"\" id= \"option"+str(qstId)+"."+str(optId)+"\">"+x.option4+"<br><br>"
			divS=divS+"Correct Answer : <input type=\"text\" name=\"txt_ans"+str(qstId)+"\" id=\"txt_ans"+str(qstId)+"\" value=\""+lis[qstId]+"\"><br><br>"
			divS=divS+"Your Response : <input type=\"text\" name=\"txt_res"+str(qstId)+"\"  value=\""+a[qstId]+"\"><br><br>"			

			optId+=1
			qstId+=1

		dict4["val1"]=divS
		dict4["status"]=True
	except Exception as e:
		print("view question fn",e)
		dict4["status"]=False
		print(dict4)
	jsondata=json.dumps(dict4)
	return HttpResponse(jsondata,content_type="application/json")





