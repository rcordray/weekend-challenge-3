$(document).ready(function() {
    console.log('JQ sourced');
    getTask();
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
                getTask();
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

function listTasks(tasklist) {
    $('#container').empty();
    for (var i = 0; i < tasklist.length; i++) {
        var taskItem = tasklist[i];
        var $taskDiv = $('<div></div>');
        $taskDiv.append('<div class="name">' + taskItem.name + '</div>');
        $('#container').prepend($taskDiv)
    }
}

function getTask() {
    $.ajax({
        url: '/tasklist',
        type: 'GET',
        success: function(data) {
            console.log(data);
            $('#container').empty();
            for (var i = 0; i < data.length; i++) {
                var taskToDisplay = data[i];
                var $taskRowToDisplay = $('<tr class = "taskRow"></tr>');
                $taskRowToDisplay.data('id', taskToDisplay.id);
                $taskRowToDisplay.append('<td class = "taskName">' + taskToDisplay.name + '</td>');
                $taskRowToDisplay.append('<td class = "koalaAge">' + taskToDisplay.age + '</td>');
            }
            $('#container').append($taskRowToDisplay);

        }
    });
}