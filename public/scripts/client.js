console.log('JS');


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
    }) // ajax post complete

$('#container').on('click', '.completeButton', function() {
    completeTask();
})

function getTask() {
    $.ajax({
        type: 'GET',
        url: '/tasklist',
        success: function(data) {
            console.log(data);
            $('#container').empty();
            for (var i = 0; i < data.length; i++) {
                var taskToDisplay = data[i];
                var $taskRowToDisplay = $('<tr class = "taskRow"></tr>');
                $taskRowToDisplay.data('id', taskToDisplay.id);
                $taskRowToDisplay.append('<td class = "taskName">' + taskToDisplay.name + '</td>');
                $taskRowToDisplay.append('<td class = "taskTask">' + taskToDisplay.task + '</td>');
                $taskRowToDisplay.append('<button class="completeButton">Completed!</button>')
                $taskRowToDisplay.append('<button class="deleteButton">Delete!</button>')

                $('#container').append($taskRowToDisplay);

            }

        }
    });
} // ajax get complete

function completeTask() {
    console.log('task is complete');
    var taskId = $(this).parent().data('id');
    $.ajax({
        method: 'PUT',
        url: '/tasklist/' + taskId,
        success: function(response) {
            getTask();
        },
        error: function(response) {
            console.log('error updating task');

        }
    })

}