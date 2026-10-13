Week 05 field notes
What did your page teach you when you changed its conditions?
When I shrank the page, I realized that although the outer container square stayed in its ratio and didn't turn into something weird, the inner .satellite rectangle boxes had fixed max-widths and font sizes in pixels, so they all started overlapping. Because their position was percentage-based, that forced the boxes to overlap and breaking the visual hierachy. As I try to add a media query with max-width: 600px, that un-hooks the inner boxes from their absolute coordinates on smaller screens. The orbit no longer exists with a smaller screen but this switch the rectangles to position: static rather than absolute so they are stacked and the big outer box no longer has to follow the 1:1 ratio. 
Sites explored:https://flority.digital/
This is a site I found as I was looking for inspiration for the midterm. The user can make a flower bouquet using this site and explore different arrangments. I think the design is very intuitive as the left side is the inventory and right is the property panel. 
Link to midterm ideation: https://docs.google.com/presentation/d/1uRWrupydjUUwBR30O0tuyO8atMNOfXuWQ635vhC52_8/edit?usp=sharing


