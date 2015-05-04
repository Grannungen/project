
 newProjectApp.directive('draggable', function($document) {
            return function(scope, element, attr) {
            	element.on('dragstart', function (event) {

                    element.css({
                       visability:'hidden'
                    });
                    // console.log(event.target.id);
                    scope.variables.dragstart = event.target.id;
                    // console.log("scope.variables.dragstart: ", scope.variables.dragstart);

                    scope.variables.indexOfDragged = findIndexByTitle(event.target.id, scope);

                    scope.$apply(); //Forces the scope to refresh
            	});
                element.on('dragover', function(event) {
                    
                    if(scope.variables.dragstart != event.target.id){
                        var indexOfDragged = findIndexByTitle(scope.variables.dragstart, scope);     
                        console.log("event.target.id: " + event.target.id);
                        var indexOfDraggedOver = findIndexByTitle(event.target.id, scope);
                        var draggedElement = scope.list[indexOfDragged];
                        var draggedOverElement = scope.list[indexOfDraggedOver];
                        // console.log("indexOfDraggedOver: " + indexOfDraggedOver);
                        // console.log("indexOfDragged: " + indexOfDragged);
                        // console.log("draggedElement: " + draggedElement.title);
                        // console.log("draggedOverElement: " + draggedOverElement.title);

                        //fungerar som den ska bara det att den inte ger det försvninner element om van försöker flytta till 1:a
                        scope.list.splice(indexOfDragged, 1);
                        scope.list.splice(indexOfDraggedOver, 0, draggedElement);
                        scope.list.splice(indexOfDraggedOver + 1 , 1);
                        if(indexOfDraggedOver == 0){
                            console.log("zero" + draggedOverElement.title);
                            scope.list.splice(1 , 0, draggedOverElement);
                        }
                        scope.$apply();
                        scope.list[0];
                        console.log(scope.list);
                                            }
                });// element.on dragover
            }; // return function(scope,element, attr)
            function findIndexByTitle (title, scope) {
                // console.log("title: " + title);
                for(var i in scope.list){
                            if(scope.list[i].title == title){
                                // console.log("return i " + i);
                                return i;
                            }
                        }
            }
            function swap (scope, indexOfDragged, indexOfDraggedOver) {
                var draggedElement = scope.list[indexOfDragged];
                var draggedOverElement = scope.list[indexOfDraggedOver];
                scope.list[indexOfDraggedOver] = draggedElement;
                scope.list[indexOfDragged] = draggedOverElement;
            }
        }); // newProjectApp.directive draggable

 newProjectApp.directive('dropable', function($document) {
 	return function(scope, element, attr) {
 		element.on('dragover', 
 			function(event) {

                
 				event.preventDefault();
 		});
 	};

 	});