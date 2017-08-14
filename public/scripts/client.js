console.log('JS');


$(document).ready(function() {
    console.log('JQ sourced');
    listTasks();
    $('#addButton').on('click', function() {
        console.log('add button clicked');
        var nameInput = $('#nameInput').val();
        var taskInput = $('#taskInput').val();
        var inputObject = {
            name: nameInput,
            task: taskInput
        };
        $.ajax({
            method: 'POST',
            url: '/tasklist',
            data: inputObject,
            success: function(response) {
                console.log(response);
                listTasks();
            }
        })
    })
})

// function getTask() {
//     $.ajax({
//         method: 'GET',
//         url: '/tasklist',
//         success: function(response) {
//             console.log(response);
//             listTasks(response)
//         }
//     })
// }

function listTasks(taskArray) {
    $('#container').empty();
    getTask();
    for (var i = 0; i < taskArray.length; i++) {
        var taskItem = taskArray[i];
        var $taskDiv = $('<div></div>');
        $taskDiv.append('<div class="name">' + taskItem.name + '</div>');
        $('#container').prepend($taskDiv)
    }
}

function getTask() {
    $.ajax({
        type: 'GET',
        url: '/tasklist',
        success: function(data) {
            console.log(data);
            listTasks(data)
                // $('#container').empty();
                // for (var i = 0; i < data.length; i++) {
                //     var taskToDisplay = data[i];
                //     var $taskRowToDisplay = $('<tr class = "taskRow"></tr>');
                //     $taskRowToDisplay.data('id', taskToDisplay.id);
                //     $taskRowToDisplay.append('<td class = "taskName">' + taskToDisplay.name + '</td>');
                //     $taskRowToDisplay.append('<td class = "taskTask">' + taskToDisplay.task + '</td>');
                // }
            $('#container').append($taskRowToDisplay);

        }
    });
}