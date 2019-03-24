/* */ 
"format cjs";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { resolveForwardRef, Injectable } from 'angular2/src/core/di';
import { isPresent, stringify } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { ListWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
import { DirectiveMetadata, ComponentMetadata, InputMetadata, OutputMetadata, HostBindingMetadata, HostListenerMetadata, ContentChildrenMetadata, ViewChildrenMetadata, ContentChildMetadata, ViewChildMetadata } from 'angular2/src/core/metadata';
import { reflector } from 'angular2/src/core/reflection/reflection';
function _isDirectiveMetadata(type) {
    return type instanceof DirectiveMetadata;
}
/*
 * Resolve a `Type` for {@link DirectiveMetadata}.
 *
 * This interface can be overridden by the application developer to create custom behavior.
 *
 * See {@link Compiler}
 */
export let DirectiveResolver = class {
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    resolve(type) {
        var typeMetadata = reflector.annotations(resolveForwardRef(type));
        if (isPresent(typeMetadata)) {
            var metadata = typeMetadata.find(_isDirectiveMetadata);
            if (isPresent(metadata)) {
                var propertyMetadata = reflector.propMetadata(type);
                return this._mergeWithPropertyMetadata(metadata, propertyMetadata);
            }
        }
        throw new BaseException(`No Directive annotation found on ${stringify(type)}`);
    }
    _mergeWithPropertyMetadata(dm, propertyMetadata) {
        var inputs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        StringMapWrapper.forEach(propertyMetadata, (metadata, propName) => {
            metadata.forEach(a => {
                if (a instanceof InputMetadata) {
                    if (isPresent(a.bindingPropertyName)) {
                        inputs.push(`${propName}: ${a.bindingPropertyName}`);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                if (a instanceof OutputMetadata) {
                    if (isPresent(a.bindingPropertyName)) {
                        outputs.push(`${propName}: ${a.bindingPropertyName}`);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                if (a instanceof HostBindingMetadata) {
                    if (isPresent(a.hostPropertyName)) {
                        host[`[${a.hostPropertyName}]`] = propName;
                    }
                    else {
                        host[`[${propName}]`] = propName;
                    }
                }
                if (a instanceof HostListenerMetadata) {
                    var args = isPresent(a.args) ? a.args.join(', ') : '';
                    host[`(${a.eventName})`] = `${propName}(${args})`;
                }
                if (a instanceof ContentChildrenMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof ViewChildrenMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof ContentChildMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof ViewChildMetadata) {
                    queries[propName] = a;
                }
            });
        });
        return this._merge(dm, inputs, outputs, host, queries);
    }
    _merge(dm, inputs, outputs, host, queries) {
        var mergedInputs = isPresent(dm.inputs) ? ListWrapper.concat(dm.inputs, inputs) : inputs;
        var mergedOutputs = isPresent(dm.outputs) ? ListWrapper.concat(dm.outputs, outputs) : outputs;
        var mergedHost = isPresent(dm.host) ? StringMapWrapper.merge(dm.host, host) : host;
        var mergedQueries = isPresent(dm.queries) ? StringMapWrapper.merge(dm.queries, queries) : queries;
        if (dm instanceof ComponentMetadata) {
            return new ComponentMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: mergedQueries,
                changeDetection: dm.changeDetection,
                providers: dm.providers,
                viewProviders: dm.viewProviders
            });
        }
        else {
            return new DirectiveMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                queries: mergedQueries,
                providers: dm.providers
            });
        }
    }
};
DirectiveResolver = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], DirectiveResolver);
export var CODEGEN_DIRECTIVE_RESOLVER = new DirectiveResolver();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2RpcmVjdGl2ZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6WyJfaXNEaXJlY3RpdmVNZXRhZGF0YSIsIkRpcmVjdGl2ZVJlc29sdmVyIiwiRGlyZWN0aXZlUmVzb2x2ZXIucmVzb2x2ZSIsIkRpcmVjdGl2ZVJlc29sdmVyLl9tZXJnZVdpdGhQcm9wZXJ0eU1ldGFkYXRhIiwiRGlyZWN0aXZlUmVzb2x2ZXIuX21lcmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLGlCQUFpQixFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQjtPQUMzRCxFQUFPLFNBQVMsRUFBVyxTQUFTLEVBQUMsTUFBTSwwQkFBMEI7T0FDckUsRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckQsRUFBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckUsRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixjQUFjLEVBQ2QsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsb0JBQW9CLEVBQ3BCLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDbEIsTUFBTSw0QkFBNEI7T0FDNUIsRUFBQyxTQUFTLEVBQUMsTUFBTSx5Q0FBeUM7QUFFakUsOEJBQThCLElBQVM7SUFDckNBLE1BQU1BLENBQUNBLElBQUlBLFlBQVlBLGlCQUFpQkEsQ0FBQ0E7QUFDM0NBLENBQUNBO0FBRUQ7Ozs7OztHQU1HO0FBQ0g7SUFFRUM7O09BRUdBO0lBQ0hBLE9BQU9BLENBQUNBLElBQVVBO1FBQ2hCQyxJQUFJQSxZQUFZQSxHQUFHQSxTQUFTQSxDQUFDQSxXQUFXQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQ2xFQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxZ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LEVBQUVBLGFBQWFBO2dCQUN0QkEsSUFBSUEsRUFBRUEsVUFBVUE7Z0JBQ2hCQSxRQUFRQSxFQUFFQSxFQUFFQSxDQUFDQSxRQUFRQTtnQkFDckJBLFFBQVFBLEVBQUVBLEVBQUVBLENBQUNBLFFBQVFBO2dCQUNyQkEsT0FBT0EsRUFBRUEsYUFBYUE7Z0JBQ3RCQSxlQUFlQSxFQUFFQSxFQUFFQSxDQUFDQSxlQUFlQTtnQkFDbkNBLFNBQVNBLEVBQUVBLEVBQUVBLENBQUNBLFNBQVNBO2dCQUN2QkEsYUFBYUEsRUFBRUEsRUFBRUEsQ0FBQ0EsYUFBYUE7YUFDaENBLENBQUNBLENBQUNBO1FBRUxBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLElBQUlBLGlCQUFpQkEsQ0FBQ0E7Z0JBQzNCQSxRQUFRQSxFQUFFQSxFQUFFQSxDQUFDQSxRQUFRQTtnQkFDckJBLE1BQU1BLEVBQUVBLFlBQVlBO2dCQUNwQkEsT0FBT0EsRUFBRUEsYUFBYUE7Z0JBQ3RCQSxJQUFJQSxFQUFFQSxVQUFVQTtnQkFDaEJBLFFBQVFBLEVBQUVBLEVBQUVBLENBQUNBLFFBQVFBO2dCQUNyQkEsT0FBT0EsRUFBRUEsYUFBYUE7Z0JBQ3RCQSxTQUFTQSxFQUFFQSxFQUFFQSxDQUFDQSxTQUFTQTthQUN4QkEsQ0FBQ0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7QUFDSEgsQ0FBQ0E7QUE5R0Q7SUFBQyxVQUFVLEVBQUU7O3NCQThHWjtBQUVELFdBQVcsMEJBQTBCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZiwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIGlzQmxhbmssIHN0cmluZ2lmeX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcG9uZW50TWV0YWRhdGEsXG4gIElucHV0TWV0YWRhdGEsXG4gIE91dHB1dE1ldGFkYXRhLFxuICBIb3N0QmluZGluZ01ldGFkYXRhLFxuICBIb3N0TGlzdGVuZXJNZXRhZGF0YSxcbiAgQ29udGVudENoaWxkcmVuTWV0YWRhdGEsXG4gIFZpZXdDaGlsZHJlbk1ldGFkYXRhLFxuICBDb250ZW50Q2hpbGRNZXRhZGF0YSxcbiAgVmlld0NoaWxkTWV0YWRhdGFcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEnO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5cbmZ1bmN0aW9uIF9pc0RpcmVjdGl2ZU1ldGFkYXRhKHR5cGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZSBpbnN0YW5jZW9mIERpcmVjdGl2ZU1ldGFkYXRhO1xufVxuXG4vKlxuICogUmVzb2x2ZSBhIGBUeXBlYCBmb3Ige0BsaW5rIERpcmVjdGl2ZU1ldGFkYXRhfS5cbiAqXG4gKiBUaGlzIGludGVyZmFjZSBjYW4gYmUgb3ZlcnJpZGRlbiBieSB0aGUgYXBwbGljYXRpb24gZGV2ZWxvcGVyIHRvIGNyZWF0ZSBjdXN0b20gYmVoYXZpb3IuXG4gKlxuICogU2VlIHtAbGluayBDb21waWxlcn1cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpcmVjdGl2ZVJlc29sdmVyIHtcbiAgLyoqXG4gICAqIFJldHVybiB7QGxpbmsgRGlyZWN0aXZlTWV0YWRhdGF9IGZvciBhIGdpdmVuIGBUeXBlYC5cbiAgICovXG4gIHJlc29sdmUodHlwZTogVHlwZSk6IERpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICB2YXIgdHlwZU1ldGFkYXRhID0gcmVmbGVjdG9yLmFubm90YXRpb25zKHJlc29sdmVGb3J3YXJkUmVmKHR5cGUpKTtcbiAgICBpZiAoaXNQcmVzZW50KHR5cGVNZXRhZGF0YSkpIHtcbiAgICAgIHZhciBtZXRhZGF0YSA9IHR5cGVNZXRhZGF0YS5maW5kKF9pc0RpcmVjdGl2ZU1ldGFkYXRhKTtcbiAgICAgIGlmIChpc1ByZXNlbnQobWV0YWRhdGEpKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eU1ldGFkYXRhID0gcmVmbGVjdG9yLnByb3BNZXRhZGF0YSh0eXBlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lcmdlV2l0aFByb3BlcnR5TWV0YWRhdGEobWV0YWRhdGEsIHByb3BlcnR5TWV0YWRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBObyBEaXJlY3RpdmUgYW5ub3RhdGlvbiBmb3VuZCBvbiAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX21lcmdlV2l0aFByb3BlcnR5TWV0YWRhdGEoZG06IERpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TWV0YWRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnlbXX0pOiBEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgdmFyIGlucHV0cyA9IFtdO1xuICAgIHZhciBvdXRwdXRzID0gW107XG4gICAgdmFyIGhvc3Q6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgdmFyIHF1ZXJpZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gocHJvcGVydHlNZXRhZGF0YSwgKG1ldGFkYXRhOiBhbnlbXSwgcHJvcE5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgbWV0YWRhdGEuZm9yRWFjaChhID0+IHtcbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBJbnB1dE1ldGFkYXRhKSB7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChhLmJpbmRpbmdQcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICBpbnB1dHMucHVzaChgJHtwcm9wTmFtZX06ICR7YS5iaW5kaW5nUHJvcGVydHlOYW1lfWApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dHMucHVzaChwcm9wTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBPdXRwdXRNZXRhZGF0YSkge1xuICAgICAgICAgIGlmIChpc1ByZXNlbnQoYS5iaW5kaW5nUHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgb3V0cHV0cy5wdXNoKGAke3Byb3BOYW1lfTogJHthLmJpbmRpbmdQcm9wZXJ0eU5hbWV9YCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dHMucHVzaChwcm9wTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBIb3N0QmluZGluZ01ldGFkYXRhKSB7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChhLmhvc3RQcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICBob3N0W2BbJHthLmhvc3RQcm9wZXJ0eU5hbWV9XWBdID0gcHJvcE5hbWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvc3RbYFske3Byb3BOYW1lfV1gXSA9IHByb3BOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgSG9zdExpc3RlbmVyTWV0YWRhdGEpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IGlzUHJlc2VudChhLmFyZ3MpID8gKDxhbnlbXT5hLmFyZ3MpLmpvaW4oJywgJykgOiAnJztcbiAgICAgICAgICBob3N0W2AoJHthLmV2ZW50TmFtZX0pYF0gPSBgJHtwcm9wTmFtZX0oJHthcmdzfSlgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBDb250ZW50Q2hpbGRyZW5NZXRhZGF0YSkge1xuICAgICAgICAgIHF1ZXJpZXNbcHJvcE5hbWVdID0gYTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgVmlld0NoaWxkcmVuTWV0YWRhdGEpIHtcbiAgICAgICAgICBxdWVyaWVzW3Byb3BOYW1lXSA9IGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIENvbnRlbnRDaGlsZE1ldGFkYXRhKSB7XG4gICAgICAgICAgcXVlcmllc1twcm9wTmFtZV0gPSBhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBWaWV3Q2hpbGRNZXRhZGF0YSkge1xuICAgICAgICAgIHF1ZXJpZXNbcHJvcE5hbWVdID0gYTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX21lcmdlKGRtLCBpbnB1dHMsIG91dHB1dHMsIGhvc3QsIHF1ZXJpZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWVyZ2UoZG06IERpcmVjdGl2ZU1ldGFkYXRhLCBpbnB1dHM6IHN0cmluZ1tdLCBvdXRwdXRzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgICAgICAgaG9zdDoge1trZXk6IHN0cmluZ106IHN0cmluZ30sIHF1ZXJpZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogRGlyZWN0aXZlTWV0YWRhdGEge1xuICAgIHZhciBtZXJnZWRJbnB1dHMgPSBpc1ByZXNlbnQoZG0uaW5wdXRzKSA/IExpc3RXcmFwcGVyLmNvbmNhdChkbS5pbnB1dHMsIGlucHV0cykgOiBpbnB1dHM7XG4gICAgdmFyIG1lcmdlZE91dHB1dHMgPSBpc1ByZXNlbnQoZG0ub3V0cHV0cykgPyBMaXN0V3JhcHBlci5jb25jYXQoZG0ub3V0cHV0cywgb3V0cHV0cykgOiBvdXRwdXRzO1xuICAgIHZhciBtZXJnZWRIb3N0ID0gaXNQcmVzZW50KGRtLmhvc3QpID8gU3RyaW5nTWFwV3JhcHBlci5tZXJnZShkbS5ob3N0LCBob3N0KSA6IGhvc3Q7XG4gICAgdmFyIG1lcmdlZFF1ZXJpZXMgPVxuICAgICAgICBpc1ByZXNlbnQoZG0ucXVlcmllcykgPyBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGRtLnF1ZXJpZXMsIHF1ZXJpZXMpIDogcXVlcmllcztcblxuICAgIGlmIChkbSBpbnN0YW5jZW9mIENvbXBvbmVudE1ldGFkYXRhKSB7XG4gICAgICByZXR1cm4gbmV3IENvbXBvbmVudE1ldGFkYXRhKHtcbiAgICAgICAgc2VsZWN0b3I6IGRtLnNlbGVjdG9yLFxuICAgICAgICBpbnB1dHM6IG1lcmdlZElucHV0cyxcbiAgICAgICAgb3V0cHV0czogbWVyZ2VkT3V0cHV0cyxcbiAgICAgICAgaG9zdDogbWVyZ2VkSG9zdCxcbiAgICAgICAgZXhwb3J0QXM6IGRtLmV4cG9ydEFzLFxuICAgICAgICBtb2R1bGVJZDogZG0ubW9kdWxlSWQsXG4gICAgICAgIHF1ZXJpZXM6IG1lcmdlZFF1ZXJpZXMsXG4gICAgICAgIGNoYW5nZURldGVjdGlvbjogZG0uY2hhbmdlRGV0ZWN0aW9uLFxuICAgICAgICBwcm92aWRlcnM6IGRtLnByb3ZpZGVycyxcbiAgICAgICAgdmlld1Byb3ZpZGVyczogZG0udmlld1Byb3ZpZGVyc1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICAgIHNlbGVjdG9yOiBkbS5zZWxlY3RvcixcbiAgICAgICAgaW5wdXRzOiBtZXJnZWRJbnB1dHMsXG4gICAgICAgIG91dHB1dHM6IG1lcmdlZE91dHB1dHMsXG4gICAgICAgIGhvc3Q6IG1lcmdlZEhvc3QsXG4gICAgICAgIGV4cG9ydEFzOiBkbS5leHBvcnRBcyxcbiAgICAgICAgcXVlcmllczogbWVyZ2VkUXVlcmllcyxcbiAgICAgICAgcHJvdmlkZXJzOiBkbS5wcm92aWRlcnNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgdmFyIENPREVHRU5fRElSRUNUSVZFX1JFU09MVkVSID0gbmV3IERpcmVjdGl2ZVJlc29sdmVyKCk7XG4iXX0=