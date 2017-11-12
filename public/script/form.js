var tab = "student"
var initDeptFlag = true

function getFormData(form){
    var unindexed_array = form.serializeArray();
    var mutationString = ``;
    var prev = ""

    $.map(unindexed_array, function(n, i){
      console.log(i)
      try{
        if(unindexed_array[i].name != unindexed_array[i-1].name  &&   unindexed_array[i].name == unindexed_array[i+1].name){

          mutationString += `${n['name']}:[`

          mutationString += `"${n['value']}"`

        }else if (unindexed_array[i].name == unindexed_array[i-1].name  &&   unindexed_array[i].name == unindexed_array[i+1].name){

          mutationString += `"${n['value']}",`
        
        }else if (unindexed_array[i].name == unindexed_array[i-1].name  &&   unindexed_array[i].name != unindexed_array[i+1].name){

          mutationString += `"${n['value']}"`

          mutationString += `],`

        }else{
          mutationString += `${n['name']}:"${n['value']}",`;
        }
      }catch(e){
        mutationString += `${n['name']}:"${n['value']}",`;
      }
    });

    console.log(mutationString)

    return mutationString;
}

function enableFormElements(){
        $('select').material_select();
        $('.modal').modal();
        $('.tooltipped').tooltip({delay: 50});
}

function sendForm(){

postData(createMutation())

}


function createMutation(userId){


  var data = $('form')

  createMutation = getFormData(data)

    if (tab == "student"){
      if(data.serializeArray().length > 6){
         Materialize.toast('Updated Successfully', 4000)


        return `
          mutation{
                  updateStudent(${createMutation.slice(0, createMutation.length -1)}){id}
          }
  ` 
      }else if(!data.serializeArray().length){
         return `
          mutation{
                  deleteStudent(id: "${userId}"){id}
          }
  `
      }

  return `
          mutation{
                  createStudent(${createMutation.slice(0, createMutation.length -1)}){id}
          }
  `
  }else if (tab == "department"){

      if(data.serializeArray()[0].value){

         Materialize.toast('Updated Successfully', 4000)


        return `
          mutation{
                  updateDepartment(${createMutation.slice(0, createMutation.length -1)}){id}
          }
  ` 
      }else if(!data.serializeArray().length){
         return `
          mutation{
                  deleteDepartment(id: "${userId}"){id}
          }
  `
      }
   Materialize.toast('Created Successfully', 4000)
   return `
          mutation{
                  createDepartment(${createMutation.slice(0, createMutation.length -1)}){id}
          }
  `

  } else if (tab ==  "courses"){

    Materialize.toast('Created Successfully', 4000)
   return `
          mutation{
                  createCourses(${createMutation.slice(0, createMutation.length -1)}){id}
          }
  `

  } else if (tab == "admin"){

  }else{
    alert("Unknown tab")
  }
}

function postData(query, callback){

  $.ajaxSetup({
    headers: {
        'Content-Type':'application/json'
    }
});

$.post('./graphql', JSON.stringify({"query":query}), function(res){
      if(callback) callback(res)
  })

}

//Courses
function initCourses(callback, id){
    query = `query{`
   
   if(!id)
    query += ` courses`
   else {
    query += `course(id: "${id}")`
  }

  query+=   `{ id
              name
              unit
              year
              department
            }
          }
                `
  if(callback) return postData(query, callback)
  if (tab == "courses") return postData(query, genDeptList)
  postData(query, genDepartmentSelect)
}


//Departments
function initDepartments(callback, id){
  query = `query{`
   
   if(!id)
    query += ` departments`
   else {
    query += `department(id: "${id}")`
    initDeptFlag = false
  }

  query+=   `{ id
              name
              shortcode
            }
          }
                `
  if(callback) return postData(query, callback)
  if (tab == "department") return postData(query, genDeptList)
  postData(query, genDepartmentSelect)
		
}

function genDepartmentSelect(departments){
  var departmentNode = document.getElementById('dept_id')
  departmentNode.innerHTML = '<option disabled="" selected="">Department</option>'
  departments["data"]["departments"].forEach(function(dept){
      department = document.createElement('option')
      department.value = dept.id
      department.text = dept.name
      departmentNode.appendChild(department)
    })
  enableFormElements()
}

//Students
function getStudentRead(callback, id){

  query = `query{`
  if(id) query += `student(id:"${id}"){`
  else query += `students{`
  query +=`
        id
        firstName
        lastName
        cgpa
        address
        gender
        email
        age
        level
        phone_no
        dept_id
        department{
          name
        }
      }
    }
    `
  if(callback) return postData(query, callback)
  postData(query, genStudentList)

}

function deleteGroup(id){
    postData(createMutation(id))
    $('a#Read').trigger('click')
     Materialize.toast('Deleted Successfully', 4000)
}

function genUpdate(data){
    getCreate()
    setTimeout(function(){
      var info = data['data'][tab]
      for(key in info){
            console.log(key)
            tag = $('#'+key)
            if(tag.prop('tagName') == "SELECT"){
              $(`option[value=${info[key]}]`).prop('selected', 'selected')
            }else{
              tag.val(info[key])
              $('input').click()
          }
      }
      enableFormElements()
    }, 2000)
}

function genStudentList(students){
  students["data"]["students"].forEach(function(student){
    studentCard = `<div class="col s6"><div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="https://media.architecturaldigest.com/photos/59f0defc364d3439f251b0e0/master/pass/bookcloth-marianna-kennedy.jpg" width="400px" height"400px">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${student.firstName} ${student.lastName}
        <p><i class="material-icons right tooltipped" data-position="bottom" data-delay="50" data-tooltip="View Record">more_vert</i>
         <a class="waves-effect waves-light btn tooltipped" data-position="bottom" data-delay="50" data-tooltip="Update Record">
        <i class="material-icons right update" href="#update" id="${student.id}">cached</i>
        </a>
          <a class="waves-effect waves-light btn modal-trigger tooltipped" data-position="bottom" data-delay="50" data-tooltip="Delete Record" href="#modal1">
          <i class="material-icons right delete " id="${student.id}">delete</i>
          </a>
        </p></span>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${student.firstName} ${student.lastName}<i class="material-icons right">close</i></span>
  `
    for (key in student){
      studentCard +=       `<p><strong>${key}</strong> &nbsp;${student[key]}</p>`
    }
    studentCard += `
     </div>
    </div></div>`

  $('div.content').append(studentCard)
  })

}

function genDeptList(departments){
  $('div.content').html("")
  departments["data"]["departments"].forEach(function(department){
    deptCard = `<div class="col s6"><div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="https://media.architecturaldigest.com/photos/59f0defc364d3439f251b0e0/master/pass/bookcloth-marianna-kennedy.jpg" width="400px" height"400px">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${department.name} 
        <p>
        <i class="material-icons tooltipped right" data-position="bottom" data-delay="50" data-tooltip="View Record">more_vert</i>
        <a class="waves-effect waves-light btn">
        <i class="material-icons right update tooltipped" data-position="bottom" data-delay="50" data-tooltip="Update Record" href="#update" id="${department.id}">cached</i>
        </a>
          <a class="waves-effect waves-light btn modal-trigger" href="#modal1">
          <i class="material-icons right delete tooltipped" data-position="bottom" data-delay="50" data-tooltip="Delete Record" id="${department.id}">delete</i>
          </a>
        </p>
        </span>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${department.name}<i class="material-icons right">close</i></span>
  `
    for (key in department){
      deptCard +=       `<p><strong>${key}</strong> &nbsp;${department[key]}</p>`
    }
    deptCard += `
     </div>
    </div></div>`

  $('div.content').append(deptCard)
  })
}

function getCreate(){
  fetch('views/create-'+tab+'.html').then(function(resp){
          $('div.content').html("")
          resp.text().then(function(text){
          $('div.content').html(text);
          if(initDeptFlag) initDepartments();
          enableFormElements();
      })
  })
}

//Init functions
getCreate()
$('a#Read').click(function(){
    $('div.content').html("")
  if(tab == "student") getStudentRead()
  else if(tab == "department") initDepartments()
  else if(tab == "courses") initCourses()
setTimeout(function(){

  $('i.update').click(function(){
    $(this).off();
    $('ul.tabs').tabs('select_tab', 'update');
    if(tab == "student")
      getStudentRead(genUpdate, $(this).prop('id'))
    else if(tab == "department") 
      initDepartments(genUpdate, $(this).prop('id'))
  });

  $('i.delete').click(function(){
    var del = $(this)
    del.off(); //Remove unnecessary event listeners
    $('.delete-agree').click(function(){
      $(this).off()
      deleteGroup(del.prop('id'))
    })
  });

  enableFormElements()
}, 2000)


})

$('a#Create').click(function(){

  if(tab=="department") initDeptFlag = false

  else initDeptFlag = true

  getCreate()
  //initDeptFlag = true
})

$('li.tab.header a').click(function(){
  tab = $(this).attr('href').replace('#', '')
})







